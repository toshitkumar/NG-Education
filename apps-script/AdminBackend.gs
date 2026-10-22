/**
 * NG EDUCATION - MASTER APPS SCRIPT WEBHOOK BACKEND
 * Connects Home Page & Admin Portal with Google Sheets, 2-Step Email Verification & Google Drive
 *
 * Spreadsheets Managed:
 * 1. Leads: 1G5RsCriKg66uLHbZfgj_Arw1CipCHsK4c4gusZ3MMnI (Student & School Leads)
 * 2. Logins: 1xr0EmkTysGumahYe-9bsFYZ5dHt9Hrwc7kHUkn9JGhY (User Logins & Credentials)
 * 3. Drive Root: "NG Education - Courses" (Automated Module & Content Folders)
 */

const CONFIG = {
  adminEmail: 'kumartoshit82@gmail.com',
  leadsSheetId: '1G5RsCriKg66uLHbZfgj_Arw1CipCHsK4c4gusZ3MMnI',
  loginsSheetId: '1xr0EmkTysGumahYe-9bsFYZ5dHt9Hrwc7kHUkn9JGhY',
  rootFolderName: 'NG Education - Courses'
};

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const action = data.action || 'lead';

    // 1. Send Admin 2-Step Password Reset OTP
    if (action === 'send_admin_otp') {
      const otp = data.otpCode;
      const recipient = data.recipient || CONFIG.adminEmail;

      MailApp.sendEmail({
        to: recipient,
        subject: '🔐 NG EDUCATION: Admin Password Reset Verification Code',
        htmlBody: `
          <div style="font-family: Arial, sans-serif; max-width: 500px; padding: 24px; border: 1px solid #E2E8F0; border-radius: 12px;">
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 16px;">
              <h2 style="color: #0E6258; margin: 0;">NG EDUCATION</h2>
            </div>
            <h3 style="color: #0F172A; margin-top: 0;">Admin Security: 2-Step Verification</h3>
            <p style="color: #475569; font-size: 15px;">You have requested to reset your Master Admin password. Use the verification code below to complete the reset:</p>
            <div style="background-color: #E6F7F5; border: 2px dashed #0E6258; border-radius: 8px; padding: 16px; text-align: center; margin: 24px 0;">
              <span style="font-size: 32px; font-weight: 800; letter-spacing: 6px; color: #0E6258;">${otp}</span>
            </div>
            <p style="color: #64748B; font-size: 13px;">This code is valid for 10 minutes. If you did not request this reset, your admin account is safe and you can ignore this email.</p>
          </div>
        `
      });

      return ContentService.createTextOutput(JSON.stringify({ status: 'success', message: 'OTP sent' }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // 2. Save User Logins to 'login credentials' Sheet
    if (action === 'save_login') {
      const ss = SpreadsheetApp.openById(CONFIG.loginsSheetId);
      const isGoogle = (data.source || '').toLowerCase().includes('google');
      const sheetName = isGoogle ? 'Google Users' : 'Direct Email Users';
      const sheet = ss.getSheetByName(sheetName) || ss.getSheets()[0];

      sheet.appendRow([
        new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
        data.id || 'USR-' + Math.floor(1000 + Math.random() * 9000),
        data.name || 'Anonymous User',
        data.email || 'N/A',
        data.phone || 'N/A',
        data.location || 'India',
        data.ip || 'N/A',
        data.deviceType || 'Desktop',
        data.os || 'N/A',
        data.browser || 'N/A',
        data.resolution || 'N/A',
        data.photoUrl || (isGoogle ? 'Google Avatar' : 'Direct Signup'),
        'Active'
      ]);

      return ContentService.createTextOutput(JSON.stringify({ status: 'success', message: 'Login saved' }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // 3. Upload Course Content to Google Drive (Module-based folders: Video, PDF, Notes, Assignment)
    if (action === 'upload_to_drive') {
      const courseName = sanitizeName(data.courseName || 'General Courses');
      const moduleName = sanitizeName(data.moduleName || 'Module 1');
      const partName = sanitizeName(data.partName || 'Part 1');
      const fileType = data.fileType || 'Content'; // Video, PDF, Notes, Assignment
      let fileName = data.fileName || `${fileType}_${partName}_${Date.now()}`;
      const base64Data = data.base64;
      const mimeType = data.mimeType || 'application/octet-stream';

      // Ensure Root Folder exists
      const rootFolder = getOrCreateFolder(DriveApp.getRootFolder(), CONFIG.rootFolderName);

      // Ensure Course Folder exists
      const courseFolder = getOrCreateFolder(rootFolder, courseName);

      // Ensure Module Folder exists
      const moduleFolder = getOrCreateFolder(courseFolder, moduleName);

      let createdFile;
      if (base64Data) {
        // Decode and write file to Module Folder
        const cleanBase64 = base64Data.indexOf(',') > -1 ? base64Data.split(',')[1] : base64Data;
        const decodedBytes = Utilities.base64Decode(cleanBase64);
        const blob = Utilities.newBlob(decodedBytes, mimeType, fileName);
        createdFile = moduleFolder.createFile(blob);
      } else if (data.textContent) {
        // Text / Notes content
        const blob = Utilities.newBlob(data.textContent, 'text/plain', fileName.endsWith('.txt') ? fileName : fileName + '.txt');
        createdFile = moduleFolder.createFile(blob);
      } else {
        throw new Error('No file payload or text content received for upload.');
      }

      // Make file viewable by link
      try {
        createdFile.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
      } catch (err) {
        // Ignore if restricted by organization domain policy
      }

      return ContentService.createTextOutput(JSON.stringify({
        status: 'success',
        fileId: createdFile.getId(),
        fileUrl: createdFile.getUrl(),
        downloadUrl: createdFile.getDownloadUrl(),
        folderUrl: moduleFolder.getUrl(),
        courseFolderUrl: courseFolder.getUrl(),
        rootFolderUrl: rootFolder.getUrl(),
        fileName: createdFile.getName(),
        folderPath: `${CONFIG.rootFolderName} / ${courseName} / ${moduleName}`,
        fileSize: createdFile.getSize()
      })).setMimeType(ContentService.MimeType.JSON);
    }

    // 4. Create / Get Module Folder in Google Drive
    if (action === 'create_module_folder') {
      const courseName = sanitizeName(data.courseName || 'General Courses');
      const moduleName = sanitizeName(data.moduleName || 'Module 1');

      const rootFolder = getOrCreateFolder(DriveApp.getRootFolder(), CONFIG.rootFolderName);
      const courseFolder = getOrCreateFolder(rootFolder, courseName);
      const moduleFolder = getOrCreateFolder(courseFolder, moduleName);

      return ContentService.createTextOutput(JSON.stringify({
        status: 'success',
        folderUrl: moduleFolder.getUrl(),
        courseFolderUrl: courseFolder.getUrl(),
        folderPath: `${CONFIG.rootFolderName} / ${courseName} / ${moduleName}`
      })).setMimeType(ContentService.MimeType.JSON);
    }

    // 5. Save Lead / Contact / Enrollment to Leads Sheet
    const leadsSs = SpreadsheetApp.openById(CONFIG.leadsSheetId);
    let targetSheet = leadsSs.getSheetByName('All Leads') || leadsSs.getSheets()[0];

    targetSheet.appendRow([
      new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      data.formType || data.section || 'General Form',
      data.name || 'Lead',
      data.contact || 'N/A',
      data.interest || 'N/A',
      data.message || 'N/A'
    ]);

    return ContentService.createTextOutput(JSON.stringify({ status: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ status: 'error', error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Helper: Get or Create Folder inside parent
function getOrCreateFolder(parentFolder, folderName) {
  const folders = parentFolder.getFoldersByName(folderName);
  if (folders.hasNext()) {
    return folders.next();
  }
  const newFolder = parentFolder.createFolder(folderName);
  try {
    newFolder.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
  } catch (e) {}
  return newFolder;
}

// Helper: Clean folder name
function sanitizeName(name) {
  return (name || '').replace(/[\/\\:*?"<>|]/g, '-').trim() || 'Untitled';
}