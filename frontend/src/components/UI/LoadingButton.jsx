import { forwardRef } from "react"
import { Button, Divider, Loader } from "rsuite"

const LoadingButton = forwardRef(({...rest},ref) => {
  return <Button ref={ref} {...rest}><Loader/><Divider vertical /> Loading...</Button>
})

export default LoadingButton
