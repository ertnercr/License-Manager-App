import { HStack, Text, UIController, UIView } from '@tuval/forms';
import { Routers } from './App/Views/Routers';


export class AppController extends UIController {


    public override LoadView(): UIView {
        return (
            HStack(
                Routers()
            )
        )
    }
}