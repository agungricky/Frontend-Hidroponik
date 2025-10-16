import Preloading from "./komponen/Preloading"
import Navbar from "./komponen/navbar"
import Asside from "./komponen/Asside"
import Dashboard from "./pages/Dshbord"
function App() {
  return (
    <>
      {/* <Preloading /> */}

      <div id="main-wrapper">
        <Navbar />
        <Asside />
        <Dashboard />    
      </div>

    </>
  )
}

export default App
