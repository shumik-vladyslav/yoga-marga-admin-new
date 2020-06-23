import { FullModalService } from "./../full-modal/full-modal.service";
import { FullModalComponent } from "./../full-modal/full-modal.component";
import { Validators, FormArray, AbstractControl } from "@angular/forms";
import { FormBuilder } from "@angular/forms";
import { FormGroup } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import {
  AngularFireStorage,
  AngularFireUploadTask
} from "@angular/fire/storage";
import { AngularFirestore } from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { map } from "rxjs/operators"
@Component({
  selector: "app-practice-modal",
  templateUrl: "./practice-modal.component.html",
  styleUrls: ["./practice-modal.component.css"]
})
export class PracticeModalComponent implements OnInit {
  practice: any = {};
  form: FormGroup;
  exercisesControlsArray;
  bmtracksControlsArray;
  groups$;
  yantra$;

  editFlagsArray = {};
  constructor(
    private fb: FormBuilder,
    private afStorage: AngularFireStorage,
    private fireStore: AngularFirestore,
    private modalService: FullModalService
  ) {
    this.groups$ = this.fireStore.collection("groups").valueChanges().pipe(map(
      gr => gr.map((gr: any) => gr.name)
    ));
    this.yantra$ = this.fireStore.collection("yantra").valueChanges().pipe(map(
      gr => gr.map((gr: any) => gr.name)
    ));
    const data = this.modalService.data;
    this.groups$.subscribe(gr => console.log('groups', gr))
    this.form = this.fb.group({
      isBm: false,
      id: ["", Validators.required],
      name: ["", Validators.required],
      groups: [],
      type: ["", Validators.required],
      shortDescription: "",
      yantra: "",
      hasAmountCounter: false,
      hasMaxAchievement: false,
      hasMetronome: false,
      exercises: this.fb.array([]),
      bmtracks: this.fb.array([])
    });

    this.exercisesControlsArray = this.form.controls["exercises"] as FormArray;
    this.bmtracksControlsArray = this.form.controls["bmtracks"] as FormArray;

    if (data) {
      this.practice = data;
      this.form.patchValue(data);

      console.log(data);

      if (data.isBm) {
        for (const tr of data.bmtracks) {
          this.bmtracksControlsArray.push(
            this.fb.group({
              name: tr.name,
              url: tr.url
            })
          );
        }
        return;
      }

      if (!data.exercises) return;
      for (const ex of data.exercises) {
        this.exercisesControlsArray.push(
          this.fb.group({
            name: ex.name,
            hasImg: ex.hasImg,
            description: ex.description,
            image: ex.image,
            audio: ex.audio,
            mirror: ex.mirror,
            exerciseDuration: this.transformExerciseDuration(ex.exerciseDuration, 'M->S')
          })
        );
      }


    }
  }

  // id: "om"
  // hasAmountCounter: true
  // name: "Мантра Ом"
  // shortDescription: "<p>Брахман выше всего, а Ом – Его имя. </p> <p>Поэтому следует почитать звук Ом. Ом – это все. Ом – это имя или символ Бога, Ишвары, Брахмана. Ом – это ваше истинное имя. Ом покрывает все три части человеческого опыта. За всеми воспринимаемыми словами стоит Ом. Весь воспринимаемый чувствами мир возник из звука Ом. В нем мир существует, и в нем растворяется. Мантра Ом включает в себя буквы «а», «у», «м».</p>"
  // template: 2
  // type: "Медитативные практики"
  // yantra: "Праджня-янтра"
  ngOnInit() {
  }

  deleteExercise(i) {
    this.exercisesControlsArray.removeAt(i);
  }

  editExerc(i) {
    this.editFlagsArray[i] = !this.editFlagsArray[i];
  }

  insertBefore(i) {
    this.exercisesControlsArray.insert(i, this.fb.group({
      isBm: false,
      name: '',
      mirror: false,
      hasImg: false,
      description: '',
      image: '',
      audio: null,
      exerciseDuration: 0
    }));
  }

  onAddExercise() {
    this.exercisesControlsArray.push(
      this.fb.group({
        isBm: false,
        name: '',
        mirror: false,
        hasImg: false,
        description: '',
        image: '',
        audio: null,
        exerciseDuration: 0
      })
    );
  }


  deleteBmTack(i) {
    this.bmtracksControlsArray.removeAt(i);
  }


  insertbmtrackBefore(i) {
    this.bmtracksControlsArray.insert(i, this.fb.group({
      name: '',
      url: null
    }));
  }

  onAddBmTack() {
    this.bmtracksControlsArray.push(
      this.fb.group({
        name: '',
        url: null
      })
    );
  }

  onUploadBmTrack(event, resourceName, i) {
    const exerciseIdx = Math.random().toString(36).substring(2);
    console.log("Upload exerciseId", exerciseIdx);

    let ref = this.afStorage.ref(
      `practices/${this.form.value.id}/${resourceName + exerciseIdx}.mp3`
    );

    const uploadTask: AngularFireUploadTask = ref.put(event.target.files[0]);

    this.practice[
      resourceName + "progress" + exerciseIdx
    ] = uploadTask.percentageChanges();

    uploadTask.then(snap => {
      snap.ref.getDownloadURL().then(downloadURL => {

        // TODO add to result value
        this.bmtracksControlsArray.at(i).controls['url'].patchValue(downloadURL);

        delete this.practice[resourceName + "progress" + exerciseIdx];
      });
    });
  }

  exerciseIdx;
  onUploadExercFile(event, resourceName, i) {
    console.log("Upload exerciseId", this.exerciseIdx);
    const exerciseIdx = Math.random().toString(36).substring(2);

    let ref = this.afStorage.ref(
      `practices/${this.form.value.id}/${exerciseIdx}.jpg`
    );

    const uploadTask: AngularFireUploadTask = ref.put(event.target.files[0]);

    this.practice[
      resourceName + "progress" + exerciseIdx
    ] = uploadTask.percentageChanges();

    uploadTask.then(snap => {
      snap.ref.getDownloadURL().then(downloadURL => {
        this.exercisesControlsArray.at(i).controls['image'].patchValue(downloadURL);
        this.exercisesControlsArray.at(i).controls['hasImg'].patchValue(true);
        delete this.practice[resourceName + "progress" + exerciseIdx];
      });
    });
  }

  onUploadExercAudio(event, resourceName, i) {
    const exerciseIdx = Math.random().toString(36).substring(2);
    console.log("Upload exerciseId", exerciseIdx);

    let ref = this.afStorage.ref(
      `practices/${this.form.value.id}/${exerciseIdx}.mp3`
    );

    const uploadTask: AngularFireUploadTask = ref.put(event.target.files[0]);

    this.practice[
      resourceName + "progress" + exerciseIdx
    ] = uploadTask.percentageChanges();

    uploadTask.then(snap => {
      snap.ref.getDownloadURL().then(downloadURL => {
        this.exercisesControlsArray.at(i).controls['audio'].patchValue(downloadURL);
        delete this.practice[resourceName + "progress" + exerciseIdx];
      });
    });
  }

  onUploadFile(event, resourceName) {
    // if(!this.form.value.name) {
    //   alert('Укажите сначала идентификатор практики. Латинскими буквами бес спецсимволов. Допускаеться дифис и подчеркиваниею')
    // }
    console.log("File upload");

    const randomId = Math.random()
      .toString(36)
      .substring(2);
    // create a reference to the storage bucket location
    let ref;
    if (resourceName == "ico") {
      ref = this.afStorage.ref(
        `practices/${this.form.value.id}/${event.target.files[0].name}`
      );
    } else if (resourceName == "img") {
      ref = this.afStorage.ref(`practices/${this.form.value.id}/m.jpg`);
      // ref = this.afStorage.ref('m.jpg');
    } else if (resourceName == "text") {
      ref = this.afStorage.ref(`practices/${this.form.value.id}/text.pdf`);
      // ref = this.afStorage.ref('text.pdf');
    } else if (resourceName == "audio") {
      ref = this.afStorage.ref(`practices/${this.form.value.id}/${event.target.files[0].name}`);
      // ref = this.afStorage.ref(resourceName);
    }

    // the put method creates an AngularFireUploadTask
    // and kicks off the upload
    const uploadTask: AngularFireUploadTask = ref.put(event.target.files[0]);

    this.practice[resourceName + "progress"] = uploadTask.percentageChanges();

    uploadTask.then(snap => {
      snap.ref.getDownloadURL().then(downloadURL => {
        if (resourceName == 'audio') {
          if (!this.practice.audio) {
            this.practice.audio = [];
          }
          this.practice.audio.push(downloadURL)
        } else {
          this.practice[resourceName] = downloadURL;
        }
        delete this.practice[resourceName + "progress"];
      });
    });
  }

  onSave(practice) {
    const res = {};
    const value = this.form.value;
    value.exercises = value.exercises.map(e => {
      e.exerciseDuration = this.transformExerciseDuration(e.exerciseDuration, 'S->M');
      return e;
    });

    Object.assign(practice, value);

    if (!practice.active) {
      practice.active = false;
    }

    practice.active = false;
    this.fireStore
      .doc("practices/" + practice.id)
      .set(practice)
      .then(res => {
        this.modalService.destroyModal();
      })
      .catch(err => alert(err));
  }

  // convert milliseconds to minutes and vice versa
  // S->M secconds to milliseconds
  // M->S milliseconds to secconds
  transformExerciseDuration(value, direction = 'S->M') {
    if (!value) return null;
    if (direction === 'S->M') {
      return value * 1000;
    }
    return Math.floor(value / 1000);
  }
}
