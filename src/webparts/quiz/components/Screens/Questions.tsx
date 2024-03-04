import * as React from "react";
import styles from "./Questions.module.scss";
import { IQuestionsProps } from "./Props";
import { PrimaryButton, Text, TextField, ChoiceGroup, IChoiceGroupOption, Checkbox } from "@fluentui/react";
import Service from "../../../../Service";
import Constants from "../../../../Constants";
import { ISPQuizItem } from "../../../../ISpQuizItem";

export const Questions: React.FunctionComponent<IQuestionsProps> = (props: IQuestionsProps) => {
  const [nameTextFieldValue, setNameTextFieldValue] = React.useState("");
  const [cityTextFieldValue, setCityTextFieldValue] = React.useState("");
  const [weekDay, setWeekDay] = React.useState<string | undefined>(undefined);
  const [isDayLightSaving, setIsDayLightSaving] = React.useState(true);
  const [dayofTheYear, setdayofTheYear] = React.useState<number | undefined>(undefined);
  const [zones, setZones] = React.useState<string[]>([]);

  const onSubmit = (): void => {
    const serviceInstance = props.context.serviceScope.consume(Service.serviceKey);
    const body: ISPQuizItem = {
      Title: nameTextFieldValue,
      City: cityTextFieldValue,
      DayLightSaving: isDayLightSaving,
      DayOfWeek: weekDay ? weekDay : "",
      DayOfYear: dayofTheYear !== undefined ? dayofTheYear : null,
      TimeZones: zones.join(","),
    };

    serviceInstance
      .submitResponse(body)
      .then((response) => {
        console.log(response);
        props.onScreenChange(2);
      })
      .catch((err) => {
        console.log(`error: ${err}`);
      });
  };

  const onNameChange = React.useCallback((event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
    setNameTextFieldValue(newValue || "");
  }, []);
  const onCityChange = React.useCallback((event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
    if (!newValue || newValue.length <= 5) {
      setCityTextFieldValue(newValue || "");
    }
  }, []);

  const onWeekDayChange = React.useCallback((ev: React.SyntheticEvent<HTMLElement>, option: IChoiceGroupOption) => {
    setWeekDay(option.key);
  }, []);

  const onDayLightSavingChange = React.useCallback((ev?: React.FormEvent<HTMLElement | HTMLInputElement>, checked?: boolean): void => {
    setIsDayLightSaving(!!checked);
  }, []);

  const onDayofTheYearChange = React.useCallback((event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue: string) => {
    setdayofTheYear(+newValue || 0);
  }, []);

  const onZonesChange = React.useCallback((checked: boolean, value: string): void => {
    if (checked) {
      setZones([...zones, value]);
    } else {
      setZones(
        zones.filter((zone: string) => {
          return zone !== value;
        })
      );
    }
  }, []);

  return (
    <div className={styles.questions}>
      <div style={{ fontWeight: "bold", marginTop: "15px" }}>User's Infomration</div>
      <div style={{ display: "flex", marginLeft: "10px" }}>
        <div className={styles.column50}>
          <TextField label="Name" required onChange={onNameChange} value={nameTextFieldValue} />
        </div>{" "}
        <div className={styles.column50} style={{ marginLeft: "5px" }}>
          <TextField label="City" required onChange={onCityChange} value={cityTextFieldValue} />
        </div>
      </div>
      <div style={{ fontWeight: "bold", marginTop: "15px" }}>Quiz Questions</div>
      <div style={{ marginLeft: "10px" }}>
        <div style={{ marginTop: "10px" }}>
          <Text>1. Enter the day of the year on 2024-03-20(YYYY-MM-DD), only numbers allowed</Text>
          <TextField style={{ marginTop: "8px" }} type="number" required onChange={onDayofTheYearChange} value={dayofTheYear?.toString() || undefined} />
        </div>
        <div style={{ marginTop: "10px" }}>
          <Text>2. Check the following checkbox if the day light saving is observed in Europe, Amsterdam</Text>
          <Checkbox label="Has Day Light saving" checked={isDayLightSaving} onChange={onDayLightSavingChange} />
        </div>
        <div style={{ marginTop: "10px" }}>
          <Text>3.Choose day of week on 2021-03-14(YYYY-MM-DD)</Text>
          <ChoiceGroup selectedKey={weekDay} options={Constants.weekDayOptions} onChange={onWeekDayChange} />;
        </div>
        <div style={{ marginTop: "10px" }}>
          <Text>4. Select all correct timezone names from America, multiselection allowed</Text>
          <Checkbox
            label="America/Thule"
            // checked={isDayLightSaving}
            onChange={(ev, checked) => {
              onZonesChange(checked ? checked : false, "America/Thule");
            }}
          />
          <Checkbox
            label="America/Thunder_Bay"
            // checked={isDayLightSaving}
            onChange={(ev, checked) => {
              onZonesChange(checked ? checked : false, "America/Thunder_Bay");
            }}
          />
          <Checkbox
            label="America/Toronto"
            // checked={isDayLightSaving}
            onChange={(ev, checked) => {
              onZonesChange(checked ? checked : false, "America/Toronto");
            }}
          />
          <Checkbox
            label="America/Torto"
            // checked={isDayLightSaving}
            onChange={(ev, checked) => {
              onZonesChange(checked ? checked : false, "America/Torto");
            }}
          />
        </div>
      </div>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <PrimaryButton text="Submit and Results" onClick={onSubmit} />
      </div>
    </div>
  );
};
