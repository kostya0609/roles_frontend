import { DynamicListPage, DynamicDetailPage, DynamicCreatePage, DynamicEditPage } from './dynamic';
import { StaticListPage, StaticDetailPage, StaticCreatePage, StaticEditPage } from './static';

/**
 * @type {import('vue-router').RouteRecordRaw}
 */
export const routes = [
	{
		path: '/roles/dynamics',
		component: DynamicListPage,
	},
	{
		path: '/roles/dynamics/create',
		component: DynamicCreatePage,
	},
	{
		path: '/roles/dynamics/detail/:id',
		component: DynamicDetailPage,
	},
	{
		path: '/roles/dynamics/edit/:id',
		component: DynamicEditPage,
	},
	{
		path: '/roles/statics',
		component: StaticListPage,
	},
	{
		path: '/roles/statics/detail/:id',
		component: StaticDetailPage,
	},
	{
		path: '/roles/statics/create',
		component: StaticCreatePage,
	},
	{
		path: '/roles/statics/edit/:id',
		component: StaticEditPage,
	},
];