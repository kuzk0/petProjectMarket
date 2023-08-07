import { extendTheme,  type ThemeConfig } from '@chakra-ui/react'

// 2. Add your color mode config
const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}

// 3. extend the theme
const theme = extendTheme({ config })



// function ToggleColor() {
   
//     const { colorMode, toggleColorMode } = useColorMode()
//     return (
//       <header>
//         <Button onClick={toggleColorMode}>
//           Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
//         </Button>
//       </header>
//     )
//   }



export default theme;