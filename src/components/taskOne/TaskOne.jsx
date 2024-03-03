import React, { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFieldValue, toggleCheckbox, selectForm } from "../features/OptionsSlice";
import './TaskOne.css'

const options = {
  canvasId: "",
  canvasCtx: null,
  canvasPtr: null,
  canvasWidth: 800,
  canvasHeight: 400,
  onError: false,
  className: "fieldsLinker",
  byName: false,
  linksByOrder: [],
  linksByName: [],
  List1: [],
  List2: [],
  Mandatories: [],
  ListHeights1: [],
  ListHeights2: [],
  move: null,
  that: null,
  lineStyle: "straight",
  handleColor: "#0000AD,#00AD00,#FF4500,#AD00AD,#244FBD,#582900,#FFCC00,#000000,#33FFCC,#FF0096,#666666".split(","),
  lineColor: "black",
  autoDetect: "off",
  oneToMany: "off",
  mandatoryErrorMessage: "This field is mandatory",
  mandatoryTooltips: true,
  canvasTopOffset: 0,
  isDisabled: false,
  globalAlpha: 1,
  effectHover: "",
  effectHoverBorderWidth: 2,
  effectHoveredLink: -1,
  associationMode: "oneToOne", }
const TaskOne = () => {
  const dispatch = useDispatch();
  const form = useSelector(selectForm);
  const canvasRef = useRef(null);
  const [startPos, setStartPos] = useState({ x: 0, y: 0, drawing: false });
  const [lines, setLines] = useState([]);
  const [data,setData]=useState([])
  const [drawing, setDrawing] = useState(false);
  const handleRadioChange = (field, value) => {
    dispatch(setFieldValue({ field, value }));
  };
  const handleCheckboxChange = (field,value) => {
    console.log(value)
    dispatch(toggleCheckbox({ field,value }));
  };

  let input =	{
    "options": {
        "lineStyle": "square-ends",
        "buttonErase": "Erase Links"
    },
    "listA": {
        "name": "columns in files",
        "list": [
            "firstName",
            "lastName",
            "phone",
            "email",
            "role",
            "Birthday",
            "Adress",
            "vdftgtrhtyjyujyujyujyukyuk"
        ]
    },
    "listB": {
        "name": "Fields available",
        "list": [
            "Birthday",
            "jobTitle",
            "adress 1",
            "adress 2",
            "first_name",
            "last_name",
            "dgrtrfgrthtytyuytjyujyjyujuyjtjuy",
            "email_adress",
            "Phone number",

        ]
    },
    "existingLinks": [{
        "from": "lastName",
        "to": "last_name"
    }, {
        "from": "firstName",
        "to": "first_name"
    }, {
        "from": "role",
        "to": "jobTitle"
    }]

}

 
  const handleItemClick = (e, item, listType) => {
    const rect = e.target.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    if (listType === 'A') {
      setStartPos({ x, y, drawing: true });
      setDrawing(true);
      setData([...data, { from: item, to: null }]);
    } else if (listType === 'B' && startPos.drawing && drawing) {
      const rect = canvasRef.current.getBoundingClientRect();
      const endX = x - rect.left;
      const endY = y - rect.top;
      const randomColor = getRandomColor();
      setLines([...lines, { startX: startPos.x, startY: startPos.y, endX, endY, color: randomColor}]);
      setStartPos({ x: 0, y: 0, drawing: false });
      setDrawing(false);
      const lastIndex = data.findIndex(line => line.to === null);
    
      if (lastIndex !== -1) {
         
        data[lastIndex] = { ...data[lastIndex], to: item };
        setDrawing(false);
      }
    
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    lines.forEach(({ startX, startY, endX, endY, color }) => {
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(endX, endY);
      ctx.strokeStyle = color;
      ctx.stroke();
    });
  }, [lines]);
    
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const handleMouseMove = (e) => {
      if (drawing) {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        lines.forEach(({ startX, startY, endX, endY, color }) => {
          ctx.beginPath();
          ctx.moveTo(startX, startY);
          ctx.lineTo(endX, endY);
          ctx.strokeStyle = color;
          ctx.stroke();
        });

        ctx.beginPath();
        ctx.moveTo(startPos.x, startPos.y);
        ctx.lineTo(x, y);
        ctx.strokeStyle = '#000'; 
        ctx.stroke();
      }
    };

    const handleMouseUp = (e) => {

      if (drawing) {
        const rect = canvas.getBoundingClientRect();
        const endX = e.clientX - rect.left;
        const endY = e.clientY - rect.top;
        setLines([...lines, { startX: startPos.x, startY: startPos.y, endX, endY, color: getRandomColor() }]);
        setDrawing(false);
      }
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseup', handleMouseUp);
    };
  }, [drawing, lines, startPos]);
  const getRandomColor = () => {
    const colors = options.handleColor;
    return colors[Math.floor(Math.random() * colors.length)];
  };
  const[toggle,setToggle]=useState(false)
  const handleResult=()=>{

setToggle(true)
  }
  return (
    <div>
      
      <div className="flex-container">
        <div className="choices fieldsLinker">
          <h3>List A</h3>
          <ul>
            {input.listA.list.map((data, i) => (
              <li
              key={i}
              className={`vertical-button ${form.enable === 'Disable' ? 'disabled' : ''} 
              || ${form.whiteSpace ==='nowrap'?'nowrap-list':''}|| ${form.mobileClickIt?'mobileClickItHover' : ''}`} 
                style={{ fontWeight: "bold", cursor: "pointer" }}
                onClick={(e) => handleItemClick(e, data, 'A')}
              >
                {data}
              </li>
            ))}
          </ul>
        </div>
        <canvas
          ref={canvasRef}
          width={options.canvasWidth}
          height={options.canvasHeight}
        />
        <div className="choices fieldsLinker">
          <h3>List B</h3>
          <ul>
            {input.listB.list.map((data, i) => (
              <li
                key={i}
                className={`vertical-button ${form.enable === 'Disable' ? 'disabled' : ''}
                || ${form.whiteSpace ==='nowrap'?'nowrap-list':''}`}
                style={{ fontWeight: "bold" }}
                onClick={(e) => handleItemClick(e, data, 'B')}
              >
                {data}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div>
  
     <div>
      <fieldset className="nice-group">
  <legend>Personalia:</legend>

  <div className="choices">
    <input
      type="radio"
      id="oneToOne"
      value="oneToOne"
      name="associationMode"
      checked={form.associationMode === 'oneToOne'}
      onChange={() => handleRadioChange('associationMode', 'oneToOne')}
    />
    <label htmlFor="oneToOne">oneToOne</label>

    <input
      type="radio"
      id="manyToMany"
      value="manyToMany"
      name="associationMode"
      checked={form.associationMode === 'manyToMany'}
      onChange={() => handleRadioChange('associationMode', 'manyToMany')}
    />
    <label htmlFor="manyToMany">manyToMany</label>
  </div>

  <div className="choices">
    <input
      type="radio"
      id="enable"
      value="Enable"
      name="enable"
      checked={form.enable === 'Enable'}
      onChange={() => handleRadioChange('enable', 'Enable')}
    />
    <label htmlFor="enable">Enable</label>

    <input
      type="radio"
      id="disable"
      value="Disable"
      name="enable"
      checked={form.enable === 'Disable'}
      onChange={() => handleRadioChange('enable', 'Disable')}
    />
    <label htmlFor="disable">Disable</label>
  </div>

  <div className="choices">
    <input
      type="radio"
      id="straight"
      value="straight"
      name="lineStyle"
      checked={form.lineStyle === 'straight'}
      onChange={() => handleRadioChange('lineStyle', 'straight')}
    />
    <label htmlFor="straight">straight</label>

    <input
      type="radio"
      id="square-ends"
      value="square-ends"
      name="lineStyle"
      checked={form.lineStyle === 'square-ends'}
      onChange={() => handleRadioChange('lineStyle', 'square-ends')}
    />
    <label htmlFor="square-ends">square-ends</label>
  </div>

  <div className="choices">
    <input
      type="checkbox"
      id="mobileClickIt"
      value="mobileClickIt"
      name="mobileClickIt"
      checked={form.mobileClickIt}
      onChange={() => handleCheckboxChange('mobileClickIt',true)}
    />
    <label htmlFor="mobileClickIt">mobileClickIt</label>
  </div>

  <div className="choices">
    <label className="group">whiteSpace :</label>

    <input
      type="radio"
      id="normal"
      value="normal"
      name="whiteSpace"
      checked={form.whiteSpace === 'normal'}
      onChange={() => handleRadioChange('whiteSpace', 'normal')}
    />
    <label htmlFor="normal">normal</label>

    <input
      type="radio"
      id="nowrap"
      value="nowrap"
      name="whiteSpace"
      checked={form.whiteSpace === 'nowrap'}
      onChange={() => handleRadioChange('whiteSpace', 'nowrap')}
    />
    <label htmlFor="nowrap">nowrap</label>
  </div>
</fieldset>
      </div>
      </div>
       <button style={{marginTop:"20px"}} onClick={()=>handleResult()}>Save links</button> 
       {
  toggle === true ?
    <p>Output={JSON.stringify(data)}</p>
    
 :""} 
 
    </div>
  );
};

export default TaskOne;




