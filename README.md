# Плагин ролей

## Установка

```bash
git submodule add https://gitlab.bitrix.bsi.local/common/plugin_roles.git ./src/plugins/roles
```

## Обновление

```bash
cd ./src/plugins/roles
```

```bash
git checkout main
```

```bash
git pull
```

## Настройки плагина

| Название | Тип         | Описание                                                                                                                                                                                                                                                                                              |
| ---------------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| API              | объект   | Настройки для измения пути запросов                                                                                                                                                                                                                                            |
| registerRoutes   | функция | Регистрирует маршруты плагина. Пример функции registerRoutes представлене ниже или можно посмотреть в проекте SED.                                                                                                         |
| prefix           | строка   | Префикс маршрута плагина                                                                                                                                                                                                                                                                |
| useBackButton    | функция | Добавляет в меню кнопку "Вернуться назад". Функция useBackButton импортируется из плагина меню. Если в проекте нет плагина меню, то нужно самому реализовать данную функцию |

### Пример настройки плагина

```js
import Roles from '@/plugins/roles';
import { registerRoutes } from '@/providers';

app.use(Roles, {
	API: { 
		DEV_URL: "http://localhost:8000",
		PROD_URL: "https://bitrix.bsi.local/api",
	},
	registerRoutes,
	prefix: '/admin',
	useBackButton,
});
```

## Пример реализации функции registerRoutes

```js
/** 
 * Пример функции регистрации маршрутов, например находится в папке проекта src/providers
 */

import { router } from '@/router';

const registerRoutes = (routes, prefix = '') => {
	routes.forEach(route => {
		router.addRoute({ ...route, path: `${prefix || ''}${route.path}` });
	});
};
```

## Добавление пунктов меню для плагина

В настройках меню необходимо в массив const = adminMenu [ ] добавить два пункта меню для работы с динамическими и статичными ролями.

```js
 export const adminMenu = [
	{
 		title: 'Динамические роли',
		path: '/admin/roles/dynamics',
		buttons: [
			{
				title: 'Создать роль',
				path: '/admin/roles/dynamics/create',
			},
			{
				icon: 'Back',
				path: '/',
				type: 'default'
			},
		],
	},
	{
		title: 'Статичные роли',
		path: '/admin/roles/statics',
		buttons: [
			{
				title: 'Создать роль',
				path: '/admin/roles/statics/create',
			},
			{
				icon: 'Back',
				path: '/',
				type: 'default'
			},
		],
	},
];


```

```

```
