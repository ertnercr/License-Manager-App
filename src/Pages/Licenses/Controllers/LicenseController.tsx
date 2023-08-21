import { HStack, UIController, UIRouteOutlet, UIView, VStack } from "@tuval/forms";
import { PortalMenu } from "../../../App/Views/PortalMenu";



export class LicenseController extends UIController {


    public LoadView(): UIView {
        return (
            VStack(
                PortalMenu("Lisans Yönetimi"),
                UIRouteOutlet().width("100%").height("100%")
            )
        )
    }
}