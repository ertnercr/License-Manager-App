import { HStack, UIController, UIRouteOutlet, UIView } from "@tuval/forms";



export class CustomersController extends UIController {


    public LoadView(): UIView {
        return (
            HStack(
                UIRouteOutlet().width("100%").height("100%")
            )
        )
    }
}