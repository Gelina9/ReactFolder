function* f1 () {
  yield 1
  yield 2
  yield 3
  return 4
}

const g1 = f1()

// function next () {
//   const { value, done } = g1.next()
//   console.log(value)
//   if (!done) next()
// }
// next()

// ------------------结合promise实现异步的同步写法---------------------

function* f2 (num) {
  const r1 = yield compute(num)
  const r2 = yield compute(r1)
  yield compute(r2)
}

const g2 = f2(2)
next()

function next (data) {
  const { value, done } = g2.next(data)
  if (!done) {
    value.then(res => {
      next(res)
    })
  }
}

function compute (num) {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log(num * num)
      resolve(num * num)
    }, 1000)
  })
}




