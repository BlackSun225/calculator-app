$(document).ready(function(){
  var screen = "0";
  var result;
  
  function addNum(a) {
    let length = screen.length;
    let operand = /[^\d\.]/; //any symbol that is not number or dot is operand
    if(length === 1 && Number(screen) === 0) {
      screen = a;
    }else if(length >= 1 && length < 21) {
      if(length >= 3 && operand.test(screen[length - 2] ) && screen[length - 1] === "0") {
        screen = screen.slice(0, length - 1) + a;
      }else {
        screen += a;
      }
    }
    $("#screen").text(screen);
  }

  function addOperand(a) {
    let length = screen.length;
    let digit = /\d/; //operand must be only after num;
    if(screen[length - 1].match(digit)) {
      screen += a;
    }else {
      screen = screen.slice(0, length - 1) + a;
    }
    $("#screen").text(screen);
  }

  function deleteLast() {
    let length = screen.length;
    if(length > 1) {
      screen = screen.slice(0, length - 1);
    }else{
      screen = "0";
    }
    $("#screen").text(screen);
  }

  function reset() {
    screen = "0";
    $("#screen").text(screen);
  }

  function addDot() {
    let dot = /\./g;
    let digit = /\d/; 
    let operand = /[^\d\.]/; //any symbol that is not number or dot is operand
    let length = screen.length;
    if(!dot.test(screen[length - 1])) {
      if(length < 2) {
        screen += ".";
      }
      if(length === 2 && digit.test(screen[length - 1])) {
        screen += ".";
      }
      if(length >= 3 && length <= 5 && !dot.test(screen)) {
        screen += ".";
      }
      if(length >= 5 && operand.test(screen[length - 2])) {
        screen += ".";
      }
    }
    $("#screen").text(screen);
  }
  
  function multiply(a) {
    let b = a.findIndex(elem => elem === "x");
    let c = Number(a[b - 1]) * Number(a[b + 1]);
    c = Math.round(c * 100) / 100;
    a.splice(b - 1, 3, c);
  }
  
  function divide(a) {
    let b = a.findIndex(elem => elem === "/");
    let c = Number(a[b - 1]) / Number(a[b + 1]);
    c = Math.round(c * 100) / 100;
    a.splice(b - 1, 3, c);
  }

  function add(a) {
    let b = a.findIndex(elem => elem === "+");
    let c = Number(a[b - 1]) + Number(a[b + 1]);
    c = Math.round(c * 100) / 100;
    a.splice(b - 1, 3, c);
  }

  function soustract(a) {
    let b = a.findIndex(elem => elem === "-");
    let c = Number(a[b+1]) * -1;
    c = Math.round(c * 100) / 100;
    if(b > 0) {
      c = Number(a[b-1]) + c;
      a.splice(b - 1, 3, c);
    }else if (b == 0) {
      a.unshift(c);
    }
  }

  function displayResult() {
    let operand = /([x/+-])/g;
    if (!operand.test(screen)) {
      result = screen;
      $("#screen").text(result);
    }else {
      const a = screen.split(operand);
      while (a.length > 1) {
        if (a.includes("x")) {
          multiply(a);
        }else if (a.includes("/")) {
          divide(a);
        }else if (a.includes("+")) {
          add(a);
        }else if (a.includes("-")) {
          soustract(a);
        }
      }
      result = a.join();
      screen = result;
      $("#screen").text(result);
    }
  }

  if(localStorage.getItem("calcTheme") === "one") {
    themeOne();
  }
  if(localStorage.getItem("calcTheme") === "two") {
    themeTwo();
  }
  if(localStorage.getItem("calcTheme") === "three") {
    themeThree();
  }
  function themeOne() {
    $(":root").css({
      "--backMain": "hsl(222, 26%, 31%)",
      "--backToggleKeyboard": "hsl(223, 31%, 20%)",
      "--backScreen": "hsl(224, 36%, 15%)",
      "--backCancelKey": "hsl(225, 21%, 49%)",
      "--backCancelKeyHover": "hsl(226, 40%, 71%)",
      "--cancelKeyShadow": "hsl(224, 28%, 35%)",
      "--backResult": "hsl(6, 63%, 50%)",
      "--backResultHover": "hsl(6, 73%, 66%)",
      "--resultShadow": "hsl(6, 70%, 34%)",
      "--backKeypad": "hsl(30, 25%, 89%)",
      "--backKeypadHover": "hsl(26, 64%, 98%)",
      "--shadowKeypad": "hsl(28, 16%, 65%)",
      "--keypadColor": "hsl(221, 14%, 31%)",
      "--defColor": "white"
    });
    $("header, #legend, #screen").css("color","var(--defColor)");
    localStorage.setItem("calcTheme","one");
    $("#switch").val("1");
  }
  function themeTwo () {
    $(":root").css({
      "--backMain": "hsl(0, 0%, 90%)",
      "--backToggleKeyboard": "hsl(0, 5%, 81%)",
      "--backScreen": "hsl(0, 0%, 93%)",
      "--backCancelKey": "hsl(185, 42%, 37%)",
      "--backCancelKeyHover": "hsl(185, 55%, 43%)",
      "--cancelKeyShadow": "hsl(185, 58%, 25%)",
      "--backResult": "hsl(25, 98%, 40%)",
      "--backResultHover": "hsl(25, 100%, 45%)",
      "--resultShadow": "hsl(25, 99%, 27%)",
      "--backKeypad": "hsl(45, 7%, 89%)",
      "--backKeypadHover": "white",
      "--shadowKeypad": "hsl(35, 11%, 61%)",
      "--keypadColor": "hsl(60, 10%, 19%)",
      "--defColor": "white"
    });
    $("header, #legend, #screen").css("color","var(--keypadColor)");
    localStorage.setItem("calcTheme","two");
    $("#switch").val("2");
  }
  function themeThree() {
    $(":root").css({
      "--backMain": "hsl(268, 75%, 9%)",
      "--backToggleKeyboard": "hsl(268, 71%, 12%)",
      "--backScreen": "hsl(268, 71%, 12%)",
      "--backCancelKey": "hsl(281, 89%, 26%)",
      "--backCancelKeyHover": "hsl(281, 75%, 35%)",
      "--cancelKeyShadow": "hsl(285, 91%, 52%)",
      "--backResult": "hsl(176, 100%, 44%)",
      "--backResultHover": "hsl(176, 90%, 80%)",
      "--resultShadow": "hsl(177, 92%, 70%)",
      "--backKeypad": "hsl(268, 47%, 21%)",
      "--backKeypadHover": "hsl(270, 55%, 41%)",
      "--shadowKeypad": "hsl(290, 70%, 36%)",
      "--keypadColor": "hsl(52, 100%, 62%)",
      "--defColor": "white"
    });
    $("header, #legend, #screen").css("color","var(--keypadColor)");
    $("#result").css("color","hsl(198, 20%, 13%)");
    localStorage.setItem("calcTheme","three");
    $("#switch").val("3");
  }  
  $("#switch").on({
    "change": function(){
      var switchVal = Number($("#switch").val());
      if(switchVal === 1) {
        themeOne();
      }
      if(switchVal === 2) {
        themeTwo();
      }
      if(switchVal === 3) {
        themeThree();
      }
    }
  });
  $(".pad").mousedown(function(){
    $(this).css("box-shadow","none");
    $(this).css("transform","scale(99%)");
  });
  $(".pad").mouseup(function(){
    $(this).css("transform","scale(100%)");
  });
  $(".dkey").mouseup(function(){
    $(this).css("box-shadow","0 4px 0 0 var(--shadowKeypad)");
  });
  $(".cancel").mouseup(function(){
    $(this).css("box-shadow","0 4px 0 0 var(--cancelKeyShadow)");
  });
  $("#result").mouseup(function(){
    $(this).css("box-shadow","0 4px 0 0 var(--resultShadow)");
  });
  $(".num").click(function(){
    let a = $(this).text();
    addNum(a);
  });
  $(".operand").click(function(){
    let a = $(this).text();
    addOperand(a);
  });
  $("#del").click(function(){
    deleteLast();
  });
  $("#reset").click(function(){
    reset();
  });
  $("#dot").click(function(){
    addDot();
  });
  $("#result").click(function(){
    displayResult();
  });
});