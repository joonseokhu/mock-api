 const 금고 = 초기값 => {
  let 비밀내용 = 초기값
  
  const 내용바꾸기 = value => {
   비밀내용 = value
  }

  const 내용얻기 = () => {
    return 비밀내용
  }

  return {
    내용바꾸기,
    내용얻기
  }
}


const 내금고 = 금고('486')

console.log(
  내금고.내용얻기()
)
console.log(
  내금고.내용바꾸기('444')
)

console.log(
  내금고.내용얻기()
)
