// Assuming both rangeLists are in ascending order and there are no overlaps in rangeList itself

const substractTimeRanges = (timeRangeListA = [], timeRangeListB = []) => {
  let differenceList = []
  for(var i = 0; i < timeRangeListA.length; i++) {
    const currentTimeRangeA = timeRangeListA[i]
    const minIndex = findMinIndexOfNearestRange(currentTimeRangeA, timeRangeListB)
    const maxIndex = findMaxIndexOfNearestRange(minIndex, currentTimeRangeA, timeRangeListB)
    if(maxIndex === -2) {
      differenceList = [...differenceList, currentTimeRangeA]
    } else {
      const list = getDifferenceRangeList(minIndex, maxIndex, currentTimeRangeA, timeRangeListB)
      differenceList = [...differenceList, ...list]
    }
  }
  return differenceList
}

const findMaxIndexOfNearestRange = (min, timeRange, timeRangeList) => {
  const { startTime: startTimeA, endTime: endTimeA } = timeRange

  for(var i = min; i < timeRangeList.length; i++ ) {
    const {startTime: startTimeB, endTime: endTimeB} = timeRangeList[i]
    if(endTimeA <= startTimeB) { // A A B B
      return i - 2
    }
    else if (startTimeA >= startTimeB && endTimeA <= endTimeB) { // B A A B
      return i - 1
    }
    else if (startTimeA <= startTimeB && endTimeA >= startTimeB && endTimeA <= endTimeB) { // A B A B
      return i
    }
    else if (startTimeA <= startTimeB && endTimeA >= startTimeB && endTimeA > endTimeB) { // A B B A
      continue
    }
    else if (startTimeA > startTimeB && endTimeA >= startTimeB && endTimeA > endTimeB) { // B A B A
      continue
    }
  }

  return i - 1 
}

const findMinIndexOfNearestRange = (timeRange, timeRangeList) => {
  const { startTime: startTimeA } = timeRange
  for(var i = 0; i < timeRangeList.length; i++) {
    const {endTime: endTimeB} = timeRangeList[i]
    if(endTimeB <= startTimeA) {
      continue
    } else {
      return i
    }
  }
}

const getDifferenceRangeList = (min, max, timeRange, timeRangeList) => {
  let differenceList = []
  let range = {}
  const { startTime: startTimeA, endTime: endTimeA } = timeRange
  for(var i = min; i <= max; i++) {
    const { startTime: startTimeB, endTime: endTimeB } = timeRangeList[i]
    if(startTimeA <= startTimeB) {
      if(i === min) {
        if(startTimeA < startTimeB)
        differenceList.push({startTime: startTimeA, endTime: startTimeB})
      } else {
        const { endTime: prevEndTimeB } = timeRangeList[i - 1]
        differenceList.push({startTime: prevEndTimeB, endTime: startTimeB})
      }
      if (i === max) {
        if(endTimeB <= endTimeA) {
          differenceList.push({startTime: endTimeB, endTime: endTimeA})
        }
      } 
    } else {
      if (i === max) {
        if(endTimeB <= endTimeA) {
          differenceList.push({startTime: endTimeB, endTime: endTimeA})
        }
      } 
    } 
  }
  return differenceList
}

// const tester = (a,b) => {
//   console.log("A: ", a)
//   console.log("B: ", b)
//   console.log("")
//   console.log("A-B: ", substractTimeRanges(a,b))
//   console.log("")
//   console.log("-----------------------------------")
// }
// const a = [
//   {startTime: 1, endTime: 10},
//   {startTime: 15, endTime: 30}
// ]

// const b = [
//   {startTime: 3, endTime: 4},
//   {startTime: 6, endTime: 11},
//   {startTime: 13, endTime: 17},
//   {startTime: 18, endTime: 20},
//   {startTime:22, endTime: 29}
// ]

// tester(a,b)

// const c = [
//   {startTime: 1, endTime: 10},
//   {startTime: 20, endTime: 30}
// ]

// const d = [
//   {startTime:5, endTime: 25}
// ]

// tester(c,d)

// const x = [
//   {startTime: 1, endTime: 10},
// ]

// const y = [
//   {startTime: 1, endTime: 5}
// ]

// tester(x,y)

// const m = [
//   {startTime: 1, endTime: 10},
// ]

// const n = [
//   {startTime: 1, endTime: 10}
// ]

// tester(m,n)

// const k = [
//   {startTime: 1, endTime: 10},
// ]

// const j = [
//   {startTime: 10, endTime: 100}
// ]

// tester(k,j)
