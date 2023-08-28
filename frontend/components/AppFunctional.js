import axios from "axios";
import React, { useState } from "react";

// önerilen başlangıç stateleri
const initialMessage = "";
const initialEmail = "";
const initialSteps = 0;
const initialIndex = 4; //  "B" nin bulunduğu indexi

export default function AppFunctional(props) {
  // AŞAĞIDAKİ HELPERLAR SADECE ÖNERİDİR.
  // Bunları silip kendi mantığınızla sıfırdan geliştirebilirsiniz.
  const [message, setMessage] = useState(initialMessage);
  const [email, setEmail] = useState(initialEmail);
  const [steps, setSteps] = useState(initialSteps);
  const [index, setIndex] = useState(initialIndex);
  function getXY() {
    // Koordinatları izlemek için bir state e sahip olmak gerekli değildir.
    // Bunları hesaplayabilmek için "B" nin hangi indexte olduğunu bilmek yeterlidir.
    return `(${(index % 3) + 1}, ${Math.floor(index / 3) + 1})`;
  }

  function getXYMesaj() {
    // Kullanıcı için "Koordinatlar (2, 2)" mesajını izlemek için bir state'in olması gerekli değildir.
    // Koordinatları almak için yukarıdaki "getXY" helperını ve ardından "getXYMesaj"ı kullanabilirsiniz.
    // tamamen oluşturulmuş stringi döndürür.
  }

  function reset() {
    // Tüm stateleri başlangıç ​​değerlerine sıfırlamak için bu helperı kullanın.
    setMessage(initialMessage);
    setEmail(initialEmail);
    setSteps(initialSteps);
    setIndex(initialIndex);
  }

  function sonrakiIndex(yon) {
    // Bu helper bir yön ("sol", "yukarı", vb.) alır ve "B" nin bir sonraki indeksinin ne olduğunu hesaplar.
    // Gridin kenarına ulaşıldığında başka gidecek yer olmadığı için,
    // şu anki indeksi değiştirmemeli.
    console.log(yon);
    setMessage("");

    if (yon === "left") {
      if (index % 3 !== 0) {
        setIndex(index - 1);
        setSteps(steps + 1);
      } else {
        setMessage("Sola gidemezsiniz");
      }
    }

    if (yon === "right") {
      if (index % 3 !== 2) {
        setIndex(index + 1);
        setSteps(steps + 1);
      } else {
        setMessage("Sağa gidemezsiniz");
      }
    }

    if (yon === "up") {
      if (index > 2) {
        setIndex(index - 3);
        setSteps(steps + 1);
      } else {
        setMessage("Yukarıya gidemezsiniz");
      }
    }

    if (yon === "down") {
      if (index < 6) {
        setIndex(index + 3);
        setSteps(steps + 1);
      } else {
        setMessage("Aşağıya gidemezsiniz");
      }
    }
  }

  function ilerle(evt) {
    // Bu event handler, "B" için yeni bir dizin elde etmek üzere yukarıdaki yardımcıyı kullanabilir,
    // ve buna göre state i değiştirir.
  }

  function onChange(evt) {
    // inputun değerini güncellemek için bunu kullanabilirsiniz
    evt.preventDefault();
    setEmail(evt.target.value);
  }

  function onSubmit(evt) {
    evt.preventDefault();
    // payloadu POST etmek için bir submit handlera da ihtiyacınız var.
    axios
      .post("/http://localhost:9000/api/result", {
        email: email,
        steps: steps,
        ...getXY(),
      })
      .then(function (response) {
        console.log(response.data);
        setMessage(response.data.message);
      })
      .catch(function (error) {
        console.log(error);
        setMessage(error.response.data.message);
      });
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">Koordinatlar {getXY()}</h3>
        <h3 id="steps">{steps} kere ilerlediniz</h3>
      </div>
      <div id="grid">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((idx) => (
          <div key={idx} className={`square${idx === index ? " active" : ""}`}>
            {idx === index ? "B" : null}
          </div>
        ))}
      </div>
      <div className="info">
        <h3 id="message">{message}</h3>
      </div>
      <div id="keypad">
        <button onClick={(e) => sonrakiIndex(e.target.id)} id="left">
          SOL
        </button>
        <button onClick={(e) => sonrakiIndex(e.target.id)} id="up">
          YUKARI
        </button>
        <button onClick={(e) => sonrakiIndex(e.target.id)} id="right">
          SAĞ
        </button>
        <button onClick={(e) => sonrakiIndex(e.target.id)} id="down">
          AŞAĞI
        </button>
        <button id="reset" onClick={reset}>
          reset
        </button>
      </div>
      <form onSubmit={onSubmit}>
        <input
          id="email"
          type="email"
          placeholder="email girin"
          value={email}
          onChange={onChange}
        ></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  );
}
