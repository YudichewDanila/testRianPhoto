import UTable from './UTable.vue';
import UColumns from './UColumns.vue';
import UCart from './UCart.vue';
import UButton from './UButton.vue';
import UForm from './UForm.vue';
import UFormCreate from './UFormCreate.vue';
import ULoader from './ULoader.vue';

const components = [
    {name:'UTable', component: UTable},
    {name: 'UColumns', component: UColumns },
    {name: 'UCart', component: UCart},
    {name: 'UButton', component:UButton},
    {name: 'UForm', component:UForm},
    {name: 'UFormCreate', component:UFormCreate},
    {name: 'ULoader', component:ULoader}
];

export default{
    install(app){
        components.forEach(({name, component})=>{
            app.component(name, component);
        })
    }
}