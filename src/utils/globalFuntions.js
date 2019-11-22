export const calculateTime = (startDate, endDate) => {
  try {
    const t1 = endDate.split('/')
    const t2 = startDate.split('/')
    const mouth = Number(t1[t1.length - 2]) - Number(t2[t2.length - 2])
    const year = Number(t1[t1.length - 1]) - Number(t2[t2.length - 1])
    return `${year} năm ${mouth} tháng`
  } catch (error) {
    return ''
  }
}
