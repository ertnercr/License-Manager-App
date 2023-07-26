import { UIRoute, UIRoutes } from '@tuval/forms'
import React from 'react'
import { CustomersController } from '../../Pages/Customers/Controllers/CustomersController'
import { AddCustomerController } from '../../Pages/Customers/Controllers/AddCustomerController'
import { LayoutController } from '../Controllers/Layout'


export const Routers = () => {
  return UIRoutes(
    UIRoute("/",LayoutController).children(
        UIRoute("customers",CustomersController).children(
          UIRoute("add",AddCustomerController),
        ),
        
    ),
   
  )
}


/* export const Routes = () => {
  return UIRoutes(
      UIRoute('/', LayoutController).children(
          UIRoute('', DashboardViewController).isIndex(true),
          UIRoute('dashboard/view', DashboardViewController),
          UIRoute('machines', MachinesController).children(
              UIRoute('list', MachinesViewController),
              UIRoute('add', AddMachineController),
              UIRoute('edit/:machine_id', MachineByIdController)
          ),
          UIRoute("competency", CompetencyController).children(
              UIRoute('list', CompetencyListController),
              UIRoute('add', AddCompetencyController),
              UIRoute("edit/:competency_id", EditCompetencyController),
              UIRoute("delete/:competency_id", DeleteCompetencyController)
          ),
          UIRoute("competencyGroup", CompetencyGroupController).children(
              UIRoute('list', CompetencyGroupListController),
              UIRoute("add", AddCompetencyGroupController),
              UIRoute("edit/:competency_group_id", EditCompetencyGroupController),
              UIRoute("delete/:competency_group_id", DeleteCompetencyGroupController)
          ),
          UIRoute("competencyGrade", CompetencyGradeController).children(
              UIRoute("level/:competency_grade_id", CompetencyGradeLevelController),
              UIRoute("edit/:competency_grade_id", EditCompetencyGradeListController),
              UIRoute("list", CompetencyGradeListController),
              UIRoute("add", AddCompetencyGradeController),
              UIRoute("delete/:competency_grade_id", DeleteCompetencyGradeController)
          ),
          UIRoute("competencyEvaluationPeriod", CompetencyEvaluationPeriodController).children(
              UIRoute("list", CompetencyEvaluationListController),
              UIRoute("add", AddCompetenyEvaluationPeriodController),
              UIRoute("edit/:evaluation_period_id", EditCompetenyEvaluationPeriodController),
              UIRoute("delete/:evaluation_period_id", DeleteCompetencyEvaluationPeriodController)
          ),
          UIRoute('polyvalenceUnit', PolyvalenceUnitController).children(
              UIRoute('add', AddPolyvalenceUnitController),
              UIRoute('list', PolyvalenceUnitListController),
              UIRoute('edit/:polyvalence_table_id', EditPolyvalenceUnitController),
              UIRoute('delete/:polyvalence_table_id', DeletePolyvalenceUnitController)
          ),
          UIRoute("competencyAssesments", CompetencyAssessmentsController).children(
              UIRoute("targetDataEntry", CompetencyTargetDataEntryController),
              UIRoute("dataEntry", CompetencyDataEntryController),
              UIRoute("report", EmployeeCompetencyReportListController)
          ),
          UIRoute("lowPerformingStaffController", LowPerformingStaffController).children(
              UIRoute("view", LowPerformingStaffViewController)
          ),
          UIRoute("parameters", ParametersController).children(
              UIRoute("view", ParametersViewController)
          ),



      ),



  )
} */