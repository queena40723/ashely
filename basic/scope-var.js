for (var i = 0; i < 5; i++) {
  setTimeout(() => {
    console.log(i);
  }, 1000);
}

// 印出什麼？
// 為什麼？

for (var i = 0; i < 5; i++) {
  ((i) => {
    setTimeout(() => {
      console.log(i);
    }, 1000);
  })(i);
}

// 印出什麼？
// 為什麼？
