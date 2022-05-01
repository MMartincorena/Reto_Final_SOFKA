import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

import { useDispatch, useSelector } from "react-redux";
import { guardarHora } from "../../store/slices/formState";
import { Grid } from "@mui/material";

export function RadioButtons() {
  const dispatchHora = useDispatch();
  const { multiStepFormValue, reservasDelDia } = useSelector(
    (state) => state.formState
  );

  const radioGroupHandle = (e) => {
    dispatchHora(guardarHora(e.target.value));
  };

  let jsonDisable = {
    medioDia: false,
    dos: false,
    cuatro: false,
    seis: false,
    ocho: false,
    dies: false,
  };

  for (let i = 0; i < reservasDelDia.length; i++) {
    // console.log(jsonDisable)
    switch (reservasDelDia[i]) {
      case "12:00":
        jsonDisable.medioDia = true;
        break;
      case "14:00":
        jsonDisable.dos = true;
        break;
      case "16:00":
        jsonDisable.cuatro = true;
        break;
      case "18:00":
        jsonDisable.seis = true;
        break;
      case "20:00":
        jsonDisable.ocho = true;
        break;
      case "22:00":
        jsonDisable.dies = true;
        break;
    }
  }

  const formatDate = (string) => {
    let date = new Date(string);
    let formatted_date =
      date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();
    return formatted_date;
  };

  let newDate = new Date();
  let hour = newDate.getHours();
  let date =
    newDate.getMonth() +
    1 +
    "/" +
    newDate.getDate() +
    "/" +
    newDate.getFullYear();
  console.log(hour);
  console.log(date);
  console.log(formatDate(multiStepFormValue.dia));

  let jsonDisable2 = {
    medioDia: false,
    dos: false,
    cuatro: false,
    seis: false,
    ocho: false,
    dies: false,
  };

  if (date === formatDate(multiStepFormValue.dia)) {
    if (hour >= 12) {
      jsonDisable2.medioDia = true;
    }
    if (hour >= 14) {
      jsonDisable2.medioDia = true;
      jsonDisable2.dos = true;
    }
    if (hour >= 16) {
      jsonDisable2.medioDia = true;
      jsonDisable2.dos = true;
      jsonDisable2.cuatro = true;
    }
    if (hour >= 18) {
      jsonDisable2.medioDia = true;
      jsonDisable2.dos = true;
      jsonDisable2.cuatro = true;
      jsonDisable2.seis = true;
    }
    if (hour >= 20) {
      jsonDisable2.medioDia = true;
      jsonDisable2.dos = true;
      jsonDisable2.cuatro = true;
      jsonDisable2.seis = true;
      jsonDisable2.ocho = true;
    }
    if (hour >= 22) {
      jsonDisable2.medioDia = true;
      jsonDisable2.dos = true;
      jsonDisable2.cuatro = true;
      jsonDisable2.seis = true;
      jsonDisable2.ocho = true;
      jsonDisable2.dies = true;
    }
  }

  return (
    <FormControl required={true} variant="filled">
      <FormLabel
        style={{ margin: "10px auto", padding: "20px 5px" }}
        id="demo-row-radio-buttons-group-label"
      >
        Escoja Un horario
      </FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        onChange={radioGroupHandle}
        value={multiStepFormValue.hora}
      >
        <Grid container style={{ marginLeft: "22px" }}>
          <Grid xs={4} item style={{ padding: "10px" }}>
            <FormControlLabel
              value="12:00"
              control={<Radio />}
              label="12:00"
              disabled={
                jsonDisable.medioDia || jsonDisable2.medioDia ? true : false
              }
              labelPlacement="bottom"
            />
          </Grid>
          <Grid xs={4} item style={{ padding: "10px" }}>
            <FormControlLabel
              value="14:00"
              control={<Radio />}
              label="14:00"
              labelPlacement="bottom"
              disabled={jsonDisable.dos || jsonDisable2.dos ? true : false}
            />
          </Grid>
          <Grid xs={4} item style={{ padding: "10px" }}>
            <FormControlLabel
              value="16:00"
              control={<Radio />}
              label="16:00"
              labelPlacement="bottom"
              disabled={
                jsonDisable.cuatro || jsonDisable2.cuatro ? true : false
              }
            />
          </Grid>
          <Grid xs={4} item style={{ padding: "10px" }}>
            <FormControlLabel
              value="18:00"
              control={<Radio />}
              label="18:00"
              labelPlacement="bottom"
              disabled={
                jsonDisable.seis || jsonDisable2.seis ? true : false
              }
            />
          </Grid>
          <Grid xs={4} item style={{ padding: "10px" }}>
            <FormControlLabel
              value="20:00"
              control={<Radio />}
              label="20:00"
              labelPlacement="bottom"
              disabled={jsonDisable.ocho || jsonDisable2.ocho ? true : false}
            />
          </Grid>
          <Grid xs={4} item style={{ padding: "10px" }}>
            <FormControlLabel
              value="22:00"
              control={<Radio />}
              label="22:00"
              labelPlacement="bottom"
              disabled={jsonDisable.dies || jsonDisable2.dies ? true : false}
            />
          </Grid>
        </Grid>
      </RadioGroup>
    </FormControl>
  );
}
