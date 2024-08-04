import { createRouter, createWebHistory } from 'vue-router'
import NewBill from '@/pages/NewBill.vue'
import Bill from '@/pages/Bill.vue'
import Bills from '@/pages/Bills.vue'

const routes = [
	{
		path: '/',
		component: NewBill,
	},
	{
		path: '/bills',
		children: [
			{
				path: '',
				component: Bills,
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
