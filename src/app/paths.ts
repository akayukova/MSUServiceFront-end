export class Paths {
  static localhost = 'http://localhost:9090/';
  static urlAuthorization = Paths.localhost + 'api/auth';
  static urlTasks = Paths.localhost + 'api/test1';
  static urlMasters = Paths.localhost + 'api/test';
  static urlAddTask = Paths.localhost + 'api/test2';
  static urlEditTask = Paths.localhost + 'api/editTask';
  static urlGetTaskById = Paths.localhost + 'api/tasks?id=';
  static urlGetMasterById = Paths.localhost + 'api/master?id=';

}
