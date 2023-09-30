import React from 'react'
import MaterialScreen from './screen/MaterialScreen'
import MaterialUIExample from './screen/MaterialUIExample'
import AdvancedMaterialUIExample from './screen/AdvancedMaterialUIExample'
import TabPanel from "./screen/TabPanel"

import ModalDialog from "./screen/ModalDialog"
import SnackbarExample from "./screen/SnackbarExample"
import ItemList from './screen/ItemList'
import StepperExample from './screen/StepperExample'
import AccordionExample from './screen/AccordionExample'
import TooltipExample from './screen/TooltipExample'
import SnackbarWithActions from './screen/SnackbarWithActions'

export default function App() {
  return (
    // <MaterialScreen />
    <>
    <MaterialUIExample />
    <AdvancedMaterialUIExample />
    <TabPanel />
    <ModalDialog />
    <SnackbarExample />
    <ItemList />
    <StepperExample />
    <AccordionExample />
    <TooltipExample />
    <SnackbarWithActions />
    </>
  )
}
