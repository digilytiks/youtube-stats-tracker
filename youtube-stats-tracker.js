/**
 * YouTube Video Stats Tracker
 * Google Apps Script to daily track view counts, likes, and comments for specified YouTube videos.
 *
 * Requirements:
 * 1. Google Sheet with a 'Video IDs' tab (Column A: Video IDs starting from row 2).
 * 2. Google Sheet with a 'YouTube' tab for output data.
 * 3. YouTube Data API v3 Advanced Service enabled in Apps Script & GCP.
 */

function updateYouTubeStats() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var inputSheet = spreadsheet.getSheetByName('Video IDs');
  var outputSheet = spreadsheet.getSheetByName('YouTube');

  if (!inputSheet || !outputSheet) {
    Logger.log("Error: Ensure both 'Video IDs' and 'YouTube' tabs exist in your spreadsheet.");
    return;
  }

  var dataRange = inputSheet.getDataRange().getValues();
  
  // Format today's date as YYYY-MM-DD
  var today = new Date();
  var formattedDate = Utilities.formatDate(today, Session.getScriptTimeZone(), "yyyy-MM-dd");
  var lastRow = outputSheet.getLastRow();
  
  Logger.log("Current output last row: " + lastRow);
  
  // Iterate through input sheet (assuming Row 1 contains headers)
  for (var i = 1; i < dataRange.length; i++) {
    var videoId = dataRange[i][0]; // Video ID in Column A
    
    if (videoId) {
      try {
        // Fetch metadata and statistics from YouTube Data API v3
        var response = YouTube.Videos.list('snippet,statistics', { id: videoId });
        
        if (response.items && response.items.length > 0) {
          var video = response.items[0];
          var title = video.snippet.title;
          var views = video.statistics.viewCount || 0;
          var likes = video.statistics.likeCount || 0;
          var comments = video.statistics.commentCount || 0;
          var publishedAt = video.snippet.publishedAt;
          
          // Write row to output sheet: Date, Video ID, Title, Views, Likes, Comments, Published Date
          var nextRow = lastRow + i;
          outputSheet.getRange(nextRow, 1).setValue(formattedDate);
          outputSheet.getRange(nextRow, 2).setValue(videoId);
          outputSheet.getRange(nextRow, 3).setValue(title);
          outputSheet.getRange(nextRow, 4).setValue(views);
          outputSheet.getRange(nextRow, 5).setValue(likes);
          outputSheet.getRange(nextRow, 6).setValue(comments);
          outputSheet.getRange(nextRow, 7).setValue(publishedAt);
        } else {
          Logger.log('No video found for ID: ' + videoId);
        }
      } catch (err) {
        Logger.log('Error fetching data for video ID ' + videoId + ': ' + err.message);
      }
    }
  }
}
