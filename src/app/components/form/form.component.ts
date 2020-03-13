import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators, FormArray, FormGroup } from "@angular/forms";

@Component({
  selector: "app-form",
  templateUrl: "./form.component.html",
  styleUrls: ["./form.component.scss"]
})
export class FormComponent implements OnInit {
  public profileForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.profileForm = this.fb.group({
      lookup: [""],
      aliases: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.aliases.push(this.fb.group({ name: ["Lead"], in: [0], out: [0] }));
    this.aliases.push(this.fb.group({ name: ["Taco"], in: [0], out: [0] }));
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.profileForm.value);
  }

  get aliases(): FormArray {
    return this.profileForm.get("aliases") as FormArray;
  }

  addAlias() {
    const name = this.profileForm.get("lookup").value;

    this.aliases.push(this.fb.group({ name: [name], in: [0], out: [0] }));
  }

  onInChange() {
    let inValue = 0;

    for (let control of this.aliases.controls.slice(1)) {
      inValue += control.get("in").value;
    }

    this.aliases.controls[0].get("in").setValue(inValue);
  }

  onOutChange() {
    let inValue = 0;

    for (let control of this.aliases.controls.slice(1)) {
      inValue += control.get("out").value;
    }

    this.aliases.controls[0].get("out").setValue(inValue);
  }
}
