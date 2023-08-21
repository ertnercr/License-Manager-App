export const colorPicker=(license:string)=>{
    switch (license) {
        case 'lisans 1':
          return "#8625A0"
        case 'lisans 2':
          return "#108ee9"
        case 'lisans 3':
          return "#87d068"
        case 'lisans 4':
          return "#2db7f5"
        case 'lisans 5':
          return "#f50"

        default:
          return "black"
      }
}