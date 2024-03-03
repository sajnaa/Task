import React, { useRef, useEffect, useState } from "react";

const Option = () => {
  const input = {
    "listA": {
      "name": "Columns in files",
      "list": [
        { id: "firstName", label: "First Name" },
        { id: "lastName", label: "Last Name" },
        { id: "phone", label: "Phone" },
      ]
    },
    "listB": {
      "name": "Fields available",
      "list": [
        { id: "Birthday", label: "Birthday" },
        { id: "jobTitle", label: "Job Title" },
        { id: "address1", label: "Address 1" },
      ]
    }
  };
 
  const [lines, setLines] = useState([]);
  const [drawing, setDrawing] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const canvasRef = useRef(null);
  
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
        ctx.strokeStyle = '#000'; // Default black color for the currently dragged line
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
const [data,setData]=useState([])
  const handleItemClick = (e, item, listType) => {
    const rect = e.target.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    if (listType === 'A') {
      setStartPos({ x, y });
      setDrawing(true);
      setData([...data, { from: item, to: null }]);
    } else if (listType === 'B' && drawing) {
      const rect = canvasRef.current.getBoundingClientRect();
      const endX = x - rect.left;
      const endY = y - rect.top;
      setLines([...lines, { startX: startPos.x, startY: startPos.y, endX, endY, color: getRandomColor() }]);
      setDrawing(false);
      const lastIndex = data.findIndex(line => line.to === null);
  
      if (lastIndex !== -1) {
       
        data[lastIndex] = { ...data[lastIndex], to: item };
      
        setDrawing(false);
      }
      console.log(data)
    }
  };

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <div>
      
      <div className="flex-container">
        <div className="choices fieldsLinker">
          <h3>{input.listA.name}</h3>
          <ul>
            {input.listA.list.map((item) => (
              <li
                key={item.id}
                style={{ fontWeight: "bold", cursor: 'pointer' }}
                onClick={(e) => handleItemClick(e, item, 'A')}
              >
                {item.label}
              </li>
            ))}
          </ul>
        </div>
        <canvas  ref={canvasRef} width={400} height={200} />
        <div className="choices fieldsLinker">
          <h3>{input.listB.name}</h3>
          <ul>
            {input.listB.list.map((item) => (
              <li
                key={item.id}
                style={{ fontWeight: "bold", cursor: 'pointer' }}
                onClick={(e) => handleItemClick(e, item, 'B')}
              >
                {item.label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Option;