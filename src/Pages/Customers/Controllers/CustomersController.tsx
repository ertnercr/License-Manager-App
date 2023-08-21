import { UIController, UIRouteOutlet, UIView, VStack } from "@tuval/forms";
import { PortalMenu } from "../../../App/Views/PortalMenu";



export class CustomersController extends UIController {


    public LoadView(): UIView {
        return (
            VStack(
                PortalMenu("Müşteri Yönetimi"),
                UIRouteOutlet().width("100%").height("100%")
            )
        )
    }
}