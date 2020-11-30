import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

let routes = [
	{
		path: '/',
		name: 'Home',
		component: Home
	},
]

const { links } = require('../config')

for (let i = 1; i < links.length; i++) {
	routes.push({
		path: links[i].to,
		name: links[i].component,
		// route level code-splitting
		// this generates a separate chunk (component.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: links[i].component,
	})
}

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router
