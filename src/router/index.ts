import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/Home.vue'
import Bills from '@/pages/Bills.vue'
import NewBill from '@/pages/NewBill.vue'
import Bill from '@/pages/Bill.vue'

const routes = [
	{
		path: '/',
		component: Home,
	},
	{
		path: '/bills',
		children: [
			{
				path: '',
				component: Bills,
			},
			{
				path: 'new',
				component: NewBill,
			},
			{
				path: ':id',
				component: Bill,
			},
		],
	},
]

const router = createRouter({
	history: createWebHistory(),
	routes,
})

export default router
