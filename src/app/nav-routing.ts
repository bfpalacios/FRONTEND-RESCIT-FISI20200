import { Route, Router } from '@angular/router';
import { Injectable } from '@angular/core';

export interface NavRoute extends Route {
    path?: string;
    icon?: string;
    group?: string;
    groupedNavRoutes?: NavRoute[];
}

export const sideNavPath = 'nav';

export const navRoutes: NavRoute[] = [
    {
        data: { title: 'Home' },
        icon: 'home',
        path: 'home',
        loadChildren: () =>
            import('./pages/home-page/home-page.module').then(
                m => m.HomePageModule,
            ),
    },
    {
        data: { title: 'Carga Manual Horarios' },
        icon: 'home',
        path: 'carga-manual-horario',
        loadChildren: () =>
            import('./pages/carga-horario/carga-horario-manual/carga-horario-manual.module').then(
                m => m.CargaHorarioManualModule,
            ),
    },
    {
        data: { title: 'Especialidades' },
        icon: 'home',
        path: 'especialidades',
        loadChildren: () =>
            import('./pages/especialidades/especialidades.module').then(
                m => m.EspecialidadesModule,
            ),
    },
    {
        path: 'especialidades/:idEspecialidades',
        loadChildren: () =>
            import('./pages/especialidades/especialidades-ver-mas/especialidades-ver-mas.module').then(
                m => m.EspecialidadesVerMasModule,
            ),
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
    },
];

@Injectable({
    providedIn: 'root',
})
export class NavRouteService {
    navRoute: Route;
    navRoutes: NavRoute[];

    constructor(router: Router) {
        this.navRoute = router.config.find(route => route.path === sideNavPath);
        this.navRoutes = this.navRoute.children
            .filter(route => route.data && route.data.title)
            .reduce((groupedList: NavRoute[], route: NavRoute) => {
                if (route.group) {
                    const group: NavRoute = groupedList.find(navRoute => {
                        return (
                            navRoute.group === route.group &&
                            navRoute.groupedNavRoutes !== undefined
                        );
                    });
                    if (group) {
                        group.groupedNavRoutes.push(route);
                    } else {
                        groupedList.push({
                            group: route.group,
                            groupedNavRoutes: [route],
                        });
                    }
                } else {
                    groupedList.push(route);
                }
                return groupedList;
            }, []);
    }

    public getNavRoutes(): NavRoute[] {
        return this.navRoutes;
    }
}
