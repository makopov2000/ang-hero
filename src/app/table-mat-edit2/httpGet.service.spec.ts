import { TestBed, getTestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpParams } from "@angular/common/http";

import { cHttpDataService } from './httpGet.service';

//let httpClientSpy: { get: jasmine.Spy };
//let httpDataService: cHttpDataService;

describe('cHttpDataService', () => {
  let injector: TestBed;
  let service: cHttpDataService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [cHttpDataService]
    });
    injector = getTestBed();
    service = injector.get(cHttpDataService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('#getUsers', () => {
    it('should return an Observable<User[]>', () => {
      const dummyUsers: ImatItem[] = [
        { id: 10, name: 'John' },
        { id: 20, name: 'Doe' }
      ];

      service.getMatItems().subscribe(users => {
        expect(users.length).toBe(2);
        expect(users[0].id).toEqual(10);
        expect(users[0].name).toEqual(dummyUsers[0].name);
        expect(users[1].id).toEqual(20);
      });

      const req = httpMock.expectOne(`${service.testGetUrl}`);
      expect(req.request.method).toBe("GET");
      req.flush(dummyUsers);
    });

    it( "search should return SearchItems",
      fakeAsync(() => {
        let response: ImatItem[] = [
            {  id: 10,   name: "Mike" }
        ];

        //let response = {
        //  results: [
        //    {
        //      id: 10,
        //      name: "Mike"
        //    }
        //  ]
        //};

        // Perform a request (this is fakeAsync to the responce won't be called until tick() is called)
        service.getMatItems().subscribe();

        // Expect a call to this URL
        const req1 = httpMock.expectOne(`${service.testGetUrl}`);
        console.log('-------->>>>>> My URL:' + req1.request.url);
        // Assert that the request is a GET.
        expect(req1.request.method).toEqual("GET");
        // Respond with this data when called
        req1.flush(response);

        // Call tick whic actually processes te response
        tick();

        // Run our tests
        expect(response.length).toBe(1);
        expect(response[0].name).toBe("Mike");
        //expect(service.results[0].name).toBe("Beautiful Day");
        //expect(service.results[0].thumbnail).toBe("image.jpg");
        //expect(service.results[0].artistId).toBe(78500);
      })


    );

  })

})

//beforeEach(() => {
//  // TODO: spy on other methods too
//  httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
//  httpDataService = new cHttpDataService(<any>httpClientSpy);
//});

//it('should return expected heroes (HttpClient called once)', () => {
//  const expectedHeroes: ImatItem[] =
//    [{ id: 1, name: 'Mike' }, { id: 2, name: 'Alex' }];

//  httpClientSpy.get.and.returnValue(asyncData(expectedHeroes));

//  httpDataService.getMatItems().subscribe(
//    res => expect(res).toEqual(expectedHeroes, 'expected Mat Items'),
//    fail
//  );
//  expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
//});


//describe('TcHttpDataService', () => {
//  beforeEach(() => TestBed.configureTestingModule({}));

//  it('should be created', () => {
//    const service: Test.ServiceService = TestBed.get(Test.ServiceService);
//    expect(service).toBeTruthy();
//  });
//});

export interface ImatItem {
  id: number;
  name: string;
  website?: string;
  email?: string;
  address?: {
    state: string;
    city: string;
    street: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
};
