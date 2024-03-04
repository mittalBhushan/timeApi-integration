**timeApi-integration Key higlhlights**
  - Contains a service using spfx default service locator pattern
  - Contains three screens, Welcome, Quiz and results
  - Quiz screen consisits of user infomation and quiz section
  - Quiz contains four questions(free Text, yes-No, Multi choicem, and single choice via choice group) ralated to time API inetgration  endpoints
  - On Submit, User detials ,user response and api response will be saved to sharepoint list
  - SharePoint list title: TimeAPI Quiz
  - Coumns:Title: string;
            DayLightSaving: boolean;
            DayLightSavingAPI?: boolean;
            City: string;
            DayOfWeek: string;
            DayOfWeekAPI?: string;
            DayOfYear: number | null;
            DayOfYearAPI?: Number;
            TimeZones: string;
            TimeZonesAPI?: string;
  - For developement, used chrome in non secure mode, disbaling CORS - chrome.exe --user-data-dir="C:/Chrome dev session" --disable-web-security![image](https://github.com/mittalBhushan/timeApi-integration/assets/155512409/1f6e614a-53c6-42a2-a23b-7be1d9e7bd56)
  - Controls used are from fluent UI react
  - All constants are coming from dedicated static constants class
  - 


