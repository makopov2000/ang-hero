import {DataSource,CollectionViewer} from '@angular/cdk/collections';
import {Observable, of,fromEvent, Subject, BehaviorSubject} from 'rxjs';
import {map, startWith,debounceTime,catchError,finalize,delay,tap} from 'rxjs/operators';
import {cHttpDataService,ImatItem,IopItem} from './httpGet.service';
import {FormControl,FormsModule, ReactiveFormsModule,FormGroup,FormBuilder, Validators,NgControl,NgForm,FormArray} from '@angular/forms';

//we need to wrap the source data, and provide some property to help bind to datatable.
export class cObject {
  public ObjStatus: ObjectEditStatus;
  public readonly ObjId: number;
  public Obj: ImatItem;
  constructor (m:ImatItem, e:ObjectEditStatus=ObjectEditStatus.unChanged) {
    this.Obj=m;
    this.ObjStatus=e;
    this.ObjId= Math.floor(Math.random()*100000);
  }
}

export enum ObjectEditStatus {
  unChanged=1,
  Modified=2,
  Added=4,
  Deleted=8,
  
}

export class cTableDataSource extends DataSource<cObject> {
  private _objectStore: cObject[]= [];
  private _ObjectsSubject$ = new BehaviorSubject<cObject[]>([]);
  private _loadingSubject$ = new BehaviorSubject<boolean>(false);

  public loading$ = this._loadingSubject$.asObservable();
  public formg: FormGroup;

  constructor(private cService: cHttpDataService) {
    super();
  }

   /*MatTable connect to a Subject, and waiting for Subject.next emit array */
  connect(): Observable<cObject[]> {
    return this._ObjectsSubject$.asObservable().pipe(
      tap (res=>{
        let fa= <FormArray> this.formg.get('formarray');
        //for (let i=fa.length-1; i--; i=0){fa.removeAt(i)}
        fa.controls.splice(0);
        res.forEach(r=> fa.push(this.createRowFormGroup(r)));
      }),
    )
  }

  createRowFormGroup(r: cObject):FormGroup {
    
    //formgroup
    let f= new FormGroup ( {
      name: this.createNewFormContorl(r,'name'),
      email: this.createNewFormContorl(r,'email'),
      state: new FormControl(r.Obj.address.state)
    });
    return f;
  }

  createNewFormContorl(r:cObject, propName:string):FormControl{
    let m=new FormControl( r.Obj[propName], Validators.required);
    m.valueChanges.subscribe(val=>{r.Obj[propName]=val;});
    return m;

  }

  disconnect() {
    this._ObjectsSubject$.complete();
    this._loadingSubject$.complete();
  }


  public loadItems(){
    this._loadingSubject$.next(true); //indicate date is loading
    this._objectStore=[]; //clear current stored data
    this._ObjectsSubject$.next(this._objectStore);

    //call service to load data
    this.cService.getMatItems().pipe(
      delay(300),
      catchError(() => of([])),
      finalize(() => this._loadingSubject$.next(false))
    ).subscribe((res: ImatItem[])=>{
        res.forEach(m=>this._objectStore.push(new cObject(m))); //store to local 
        this._ObjectsSubject$.next(this._objectStore);
      }
    );

  };


  public addNewMatItem(m:ImatItem): cObject {
    if (!m) {m=this.cService.createNewMatItem();};
    let o=new cObject(m, ObjectEditStatus.Added);
    this._objectStore.push(o);
    this._ObjectsSubject$.next(this._objectStore);
    return o;
  }

  public deleteItem(res:cObject) {
    if (!res || !res.Obj) {return;}
    let d = res.ObjId;
    var ix:number;

    if (res.Obj.id) {
        //this item come from server, we need commit delete operation to server

    } else {
      //new added item, not commit to server yet
      //we only need to simply remove it from local data store
    }

    //remove it from local store data
    this._objectStore.forEach((m,i)=>{
        if (m.ObjId===d) {this._objectStore.splice(i,1);}
    });

    this._ObjectsSubject$.next(this._objectStore);
  };

  public CommitAllChanges():void{
    if(this._objectStore) {
      this._objectStore.forEach(m=>{
          m.ObjStatus=ObjectEditStatus.unChanged;
        }
      )
    }
  };
  
  public CommitItem(res: cObject):void {
    if (!res || !res.Obj){return;}
    let d=res.ObjId;
    if (res.Obj.id) {
        //this item come from server, we need commit change operation to server

    } else {
      //new added item, we need commit add new operation to server
      console.log(res);
    }
    
    res.ObjStatus=ObjectEditStatus.unChanged;
    
  }
  

  public sortData(s) {
    console.log(s);
  }
}
