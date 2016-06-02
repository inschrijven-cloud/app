import {PouchDBService} from "./pouchdb.service";
describe("PouchDB service", () => {
  it("should cache databases", () => {
    const pouchDbService = new PouchDBService();
    const service1 = pouchDbService.getDb("some-test-db");
    const service2 = pouchDbService.getDb("some-test-db");
    expect(service1).toEqual(service2);
  });

  it("return a different database for different database name", () => {
    const pouchDbService = new PouchDBService();
    const service1 = pouchDbService.getDb("some-test-db-1");
    const service2 = pouchDbService.getDb("some-test-db-2");
    expect(service1).not.toEqual(service2);
  });
});
