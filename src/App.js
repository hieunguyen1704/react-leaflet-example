import React, { useState } from "react";
import "./App.css";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import PublicDataMap from "./components/map/PublicDataMap";
import DateTimePicker from "./components/form/DateTimePicker";
import TabPanel from "./components/menu/TabPanel";
import Button from "@material-ui/core/Button";
import Alert from "./components/alert/Alert";
import { isEmpty } from "./utils/functions";

function App() {
  const [positionChoose, setPositionChoose] = useState("rectangle");
  const [mapDataPosition, setMapDataPosition] = useState({});
  const [isDisplayResponse, setIsDisplayResponse] = useState(false);
  const [timeData, setTimeData] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const timeDeleteErrorMessage = 6000;
  const handlePositionChooseChange = (e) => {
    setPositionChoose(e.target.value);
  };
  const handleGetData = (e) => {
    if (!isEmpty(mapDataPosition) && !isEmpty(timeData)) {
      setIsDisplayResponse(true);
      setErrorMessage("");
      return;
    } else if (isEmpty(mapDataPosition)) {
      setErrorMessage("Vui lòng chọn địa điểm trên bản đồ!");
    } else {
      setErrorMessage("Vui lòng chọn thời gian!");
    }
    setTimeout(() => {
      setErrorMessage("");
    }, timeDeleteErrorMessage);
  };
  const instruction = () => {
    if (positionChoose === "rectangle") {
      return (
        <span>
          Lần lượt click vào bản đồ để chọn 2 điểm đại diện cho đường đường chéo
          của hình chữ nhật, điều chỉnh vị trí 2 điểm này để thay đổi kích thước
          và vị trí của hình chữ nhật
        </span>
      );
    } else if (positionChoose === "circle") {
      return (
        <span>
          Click vào bản đồ để chọn điểm làm tâm của hình tròn và nhập bán kính
          mong muốn, có thể điều chỉnh vị trí tâm và bán kính của hình tròn (
          <strong>Sẽ cung cấp tính năng này sau</strong>)
        </span>
      );
    } else {
      return (
        <span>
          Lần lượt click vào bản đồ để chọn 2 điểm đại diện cho điểm đầu và điểm
          cuối của đường thẳng, điều chỉnh vị trí 2 điểm này để thay đổi vị trí
          của đường thẳng
        </span>
      );
    }
  };
  return (
    <div className="container">
      {errorMessage && (
        <Alert
          message={errorMessage}
          type="error"
          timeDeleteMessage={timeDeleteErrorMessage}
          setDeleteMessage={setErrorMessage}
        />
      )}
      <h2 className="header">
        Lấy dữ liệu về tình trạng giao thông trong Tp. Hồ Chí Minh
      </h2>
      <h4>Hãy thực hiện theo các bước sau để tiến hành lấy dữ liệu:</h4>
      <ol style={{ marginBottom: 0, paddingBottom: 16 }}>
        <li>
          Chọn vị trí cụ thể trên bản đồ nơi muốn lấy dữ liệu. Hệ thống hiện tại
          cung cấp 3 phương thức để chọn vị trí, vui lòng chọn một:
        </li>
        <FormControl component="fieldset">
          <RadioGroup
            aria-label="gender"
            name="positionChoose"
            value={positionChoose}
            onChange={handlePositionChooseChange}
          >
            <FormControlLabel
              value="rectangle"
              control={<Radio />}
              label="Chọn theo hình chữ nhật"
            />

            <FormControlLabel
              value="line"
              control={<Radio />}
              label="Chọn theo đường thẳng"
            />

            <FormControlLabel
              value="circle"
              control={<Radio />}
              label="Chọn theo hình tròn"
            />
          </RadioGroup>
        </FormControl>
        <p>
          <strong>Hướng dẫn: </strong>
          {instruction()}
        </p>
        <PublicDataMap
          setMapDataPosition={setMapDataPosition}
          positionChoose={positionChoose}
        />
        <li className="mt24">Chọn thời gian muốn lấy dữ liệu:</li>
        <DateTimePicker className="mt24" setTimeData={setTimeData} />
        <Button
          variant="contained"
          color="primary"
          className="buttonGetData"
          onClick={handleGetData}
        >
          Lấy dữ liệu
        </Button>
        <li className="mt24">Kết quả: </li>
        {isDisplayResponse ? (
          <TabPanel />
        ) : (
          <strong>Vui lòng click vào nút "Lấy dữ liệu"</strong>
        )}
      </ol>
    </div>
  );
}

export default App;
