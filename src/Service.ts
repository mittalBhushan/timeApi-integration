import IService from "./IService";
import { ServiceKey, ServiceScope } from "@microsoft/sp-core-library";
import { HttpClient, HttpClientResponse, SPHttpClient, SPHttpClientResponse } from "@microsoft/sp-http";
import { PageContext } from "@microsoft/sp-page-context";
import { ISPQuizItem } from "./ISpQuizItem";

export default class Service implements IService {
  // public static readonly serviceKey: ServiceKey<IService> =
  // ServiceKey.create<Service>('my-custom-app:ICustomSPService', Service);
  public static readonly serviceKey: ServiceKey<IService> = ServiceKey.create<Service>("timeOPAndSP: IService", Service);

  private _spHttpClient: SPHttpClient;
  private _httpClient: HttpClient;
  private _pageContext: PageContext;
  //   private _currentWebUrl: string;

  constructor(serviceScope: ServiceScope) {
    serviceScope.whenFinished(() => {
      this._spHttpClient = serviceScope.consume(SPHttpClient.serviceKey);
      this._httpClient = serviceScope.consume(HttpClient.serviceKey);
      this._pageContext = serviceScope.consume(PageContext.serviceKey);
      //   this._currentWebUrl = this._pageContext.web.absoluteUrl;
    });
  }

  public submitResponse = async (body: ISPQuizItem) => {
    const allAnswers = Promise.all([
      this._httpClient.get("https://timeapi.io/api/Conversion/DayOfTheYear/2024-03-20", HttpClient.configurations.v1),
      this._httpClient.get("https://timeapi.io/api/TimeZone/zone?timeZone=Europe/Amsterdam", HttpClient.configurations.v1),
      this._httpClient.get("https://timeapi.io/api/Conversion/DayOfTheWeek/2021-03-14", HttpClient.configurations.v1),
      this._httpClient.get("https://timeapi.io/api/TimeZone/AvailableTimeZones", HttpClient.configurations.v1),
    ]);

    const allResponses: HttpClientResponse[] = await allAnswers;
    const r1 = await allResponses[0].json();
    const r2 = await allResponses[1].json();
    const r3 = await allResponses[2].json();
    const r4 = await allResponses[3].json();
    console.log(
      "AllRepsonese",
      r1.day,
      r2.hasDayLightSaving,
      r3.dayOfWeek,
      r4
        .filter((zoneName: string) => {
          return zoneName.indexOf("America/T") > -1;
        })
        .join(",")
    );
    body.DayOfYearAPI = r1.day;
    body.DayLightSavingAPI = r2.hasDayLightSaving;
    body.DayOfWeekAPI = r3.dayOfWeek;
    body.TimeZonesAPI = r4
      .filter((zoneName: string) => {
        return zoneName.indexOf("America/T") > -1;
      })
      .join(",");

    return this._spHttpClient
      .post(`${this._pageContext.web.absoluteUrl}/_api/web/lists/getbytitle('TimeAPI Quiz')/items`, SPHttpClient.configurations.v1, {
        headers: {
          Accept: "application/json;odata=nometadata",
          "Content-type": "application/json;odata=nometadata",
          "odata-version": "",
        },
        body: JSON.stringify(body),
      })
      .then((response: SPHttpClientResponse) => {
        if (response.ok) {
          response
            .json()
            .then((responseJSON) => {
              console.log(responseJSON);
              return responseJSON;
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          response
            .json()
            .then((responseJSON) => {
              console.log(responseJSON);
              return responseJSON;
            })
            .catch((error) => {
              console.log(error);
            });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
}
