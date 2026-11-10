# 📊 YouTube Daily Video Stats Tracker (Google Apps Script)

Automated Google Apps Script that pulls daily performance statistics (Views, Likes, Comments) for a list of YouTube videos directly into Google Sheets using the **YouTube Data API v3**. 

Designed for content performance monitoring, time-series analysis, and embedding into reporting tools like **Data Studio** (e.g., competitor analysis, trend analysis, content velocity).

---

## 🌟 Key Features

* **Automated Daily Snapshot:** Records cumulative daily counts for views, likes, and comments along with formatted date stamps (`YYYY-MM-DD`).
* **Multi-Video Tracking:** Loops through a dynamic list of YouTube video IDs from a dedicated tab.
* **Data Studio Ready:** Formats data cleanly into rows for easy aggregation, daily delta calculations, or visual reporting.
* **Error Handling:** Logs invalid IDs or API errors safely without breaking execution.

---

## 📁 Google Sheet Structure

Before running the script, ensure your Google Sheet contains two sheets configured as follows:

### 1. Tab Name: `Video IDs`
| Column A (Row 1 Header: `Video ID`) |
| :--- |
| `dQw4w9WgXcQ` |
| `3JZ_D3ELwOQ` |

### 2. Tab Name: `YouTube`
| A | B | C | D | E | F | G |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Date** | **Video ID** | **Title** | **Views** | **Likes** | **Comments** | **Published Date** |

---

## 🚀 Setup Instructions

### 1. Add Script to Google Sheets
1. Open your Google Sheet.
2. Navigate to **Extensions > Apps Script**.
3. Replace any default code in `Code.gs` with the code provided in `Code.gs` in this repository.
4. Click **Save** 💾.

### 2. Enable YouTube Data API Service in Apps Script
1. Inside the Apps Script editor, look at the left sidebar and click **Services** (`+` icon).
2. Scroll down and select **YouTube Data API v3**.
3. Click **Add** (leave Identifier as `YouTube`).

### 3. Google Cloud Platform (GCP) Configuration & Token Expiry Fix

> ⚠️ **Important Note on Token Expirations:** If your GCP project OAuth consent screen is set to **Testing**, Google automatically expires authentication tokens every 7 days, causing automated triggers to fail silently.

To ensure your script runs continuously without weekly re-authorizations:

1. Open the [Google Cloud Console](https://console.cloud.google.com/).
2. Select or link the GCP project attached to your Apps Script.
3. Navigate to **APIs & Services > OAuth consent screen**.
4. If status is set to **Testing**, click **PUBLISH APP** to switch to **In Production** (or set to **Internal** if using a Google Workspace account).
   * *Note: You do NOT need to submit for verification if using standard non-sensitive scopes for personal projects.*
5. In Apps Script, click **Run** manually once to grant permissions (click *Advanced > Go to project (unsafe)* if prompted).

---

## ⏰ Setting Up Daily Automation (Triggers)

1. In the Apps Script editor, click the **Triggers** icon (alarm clock) on the left sidebar.
2. Click **+ Add Trigger** (bottom right).
3. Configure the trigger:
   * **Function to run:** `updateYouTubeStats`
   * **Deployment:** `Head`
   * **Event source:** `Time-driven`
   * **Type of time-based trigger:** `Day timer`
   * **Select time of day:** Choose your preferred daily execution window (e.g., *Midnight to 1 AM*).
4. Click **Save**.

---

## 🛠️ Usage with Data Studio
* **Daily Spikes & Velocity:** Because raw YouTube data is cumulative, compute day-over-day changes in Data Studio using **Comparison Date Ranges** or **Table Calculations**. Alternatively calculate the daily totals in a separate Google Sheet Tab and connect that new sheet to Data Studio.
* **Visualization:** Connect the `YouTube` sheet tab directly as a data source to generate line charts, top-performing video leaderboards, or campaign metrics.

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).
