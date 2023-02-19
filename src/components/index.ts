import { App, Component } from "vue";

export default {
    install(app: App){
        const components = Object.entries(import.meta.glob('./**/*.vue', {eager: true, import: 'default'}))

        components.forEach(([name, module])=>{
            const [, componentName] = (name.match(/\/([^/]*?)\.vue/) as string[])
            if(componentName){
            app.component(componentName, module as Component)
            }
        })
    }
}