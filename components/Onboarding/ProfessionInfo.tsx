"use client"
import Link from "next/link";
import { Formik, Field, FieldArray, Form } from "formik";
import SubmitButton from "@components/FormInputs/SubmitButton";
import { useState } from "react";
import toast from "react-hot-toast";
import { ContactFormProps, professionFormProps } from "@/types/types";
import { Button } from "@components/ui/button";
import { useRouter } from "next/navigation";
import { StepFormProps } from "./BioDataForm";
import MultipleImageInput from "@components/FormInputs/MultipleImageInput";
import ArrayItemsInput from "@components/FormInputs/ArrayInput";
import TextInput from "@components/FormInputs/TextInput";
import SelectInput from "@components/FormInputs/SelectInput";
import { register } from "module";
import MultipleFileUpload from "@components/FormInputs/MultipleFileUpload";

export default function ProfessionInfoForm({
  page,
  title,
  description,
}: StepFormProps) {
  // this array of options will actually come from the backend not hard coded like this
  const specialities = [
    { value: 'cardiology', label: 'Cardiology' },
    { value: 'neurology', label: 'Neurology' },
    { value: 'oncology', label: 'Oncology' },
    { value: 'orthopedics', label: 'Orthopedics' },
    { value: 'pediatrics', label: 'Pediatrics' },
    { value: 'dermatology', label: 'Dermatology' },
    { value: 'gastroenterology', label: 'Gastroenterology' },
    { value: 'pulmonology', label: 'Pulmonology' },
    { value: 'rheumatology', label: 'Rheumatology' },
    { value: 'endocrinology', label: 'Endocrinology' },
    { value: 'nephrology', label: 'Nephrology' },
    { value: 'infectious-diseases', label: 'Infectious Diseases' },
    { value: 'urology', label: 'Urology' },
    { value: 'gynecology', label: 'Gynecology' },
    { value: 'obstetrics', label: 'Obstetrics' },
    { value: 'general-surgery', label: 'General Surgery' },
    { value: 'plastic-surgery', label: 'Plastic Surgery' },
    { value: 'cardiac-surgery', label: 'Cardiac Surgery' },
    { value: 'orthopedic-surgery', label: 'Orthopedic Surgery' },
    { value: 'neurosurgery', label: 'Neurosurgery' },
    { value: 'podiatry', label: 'Podiatry' },
    { value: 'psychiatry', label: 'Psychiatry' },
    { value: 'internal-medicine', label: 'Internal Medicine' },
    { value: 'family-medicine', label: 'Family Medicine' },
    { value: 'emergency-medicine', label: 'Emergency Medicine' },
    { value: 'sports-medicine', label: 'Sports Medicine' },
    { value: 'pain-management', label: 'Pain Management' },
    { value: 'allergy-immunology', label: 'Allergy & Immunology' },
    { value: 'medical-genetics', label: 'Medical Genetics' },
    { value: 'hospice-palliative-care', label: 'Hospice & Palliative Care' },
    { value: 'sleep-medicine', label: 'Sleep Medicine' },
    { value: 'addiction-medicine', label: 'Addiction Medicine' },
    { value: 'preventive-medicine', label: 'Preventive Medicine' },
    { value: 'public-health', label: 'Public Health' },
    { value: 'occupational-medicine', label: 'Occupational Medicine' },
    { value: 'vascular-surgery', label: 'Vascular Surgery' },
    { value: 'neonatology', label: 'Neonatology' },
    { value: 'critical-care-medicine', label: 'Critical Care Medicine' },
    { value: 'transplant-surgery', label: 'Transplant Surgery' },
    { value: 'anesthesiology', label: 'Anesthesiology' },
    { value: 'radiology', label: 'Radiology' },
    { value: 'nuclear-medicine', label: 'Nuclear Medicine' },
    { value: 'clinical-pathology', label: 'Clinical Pathology' },
    { value: 'anatomic-pathology', label: 'Anatomic Pathology' },
    { value: 'forensic-pathology', label: 'Forensic Pathology' },
    { value: 'dermatopathology', label: 'Dermatopathology' },
    { value: 'hematopathology', label: 'Hematopathology' },
    { value: 'cytopathology', label: 'Cytopathology' },
  ];
  const [isLoading, setIsLoading] = useState(false);
  const [docs, setDocs] = useState<string[]>([]); // Ensure docs is a string array
  const router = useRouter();

  return (
    <div className="w-full">
      <div className="text-center border-b border-gray-200 pb-4">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-2">
          {title}
        </h1>
        <p className="text-balance text-muted-foreground">
          {description}
        </p>
      </div>
      <Formik
        initialValues={{
          email: "",
          phone: "",
          city: "",
          country: "",
          state: "",
          otherSpecialities: [""],
        }}
        onSubmit={async (values) => {
          console.log(values);
          setIsLoading(true);
          // Implement form submission logic here
          setIsLoading(false);
        }}
      >
        {({  values, errors, getFieldProps }) => (
          <Form className="py-4 px-4 mx-auto">
            <div className="grid gap-4 grid-cols-2">
              <TextInput
                label="Medical School"
                name="medical school"
                placeholder="Enter your Grad School Name"
                register={getFieldProps("medical school")}
                errors={errors}
              />
              <TextInput
                label="Graduation Year"
                name="graduation year"
                placeholder="Enter your Grad year"
                register={getFieldProps("grad year")}
                errors={errors}
              />
               <SelectInput
                label="Select your Primary specialization"
                name="primaryspecialization"
                options={specialities}
                register={register}
                errors={errors}
                defaultOptionText="Select a specialty" // Pass the text here
              />
              <FieldArray
                name="otherSpecialities"
                render={({ insert, remove, push }) => (
                  <div>
                    {values.otherSpecialities.length > 0 &&
                      values.otherSpecialities.map((item, index) => (
                        <div key={index}>
                          <Field
                            name={`otherSpecialities.${index}`}
                            as="textarea"
                            placeholder="Add other Specialities"
                          />
                          <button
                            type="button"
                            onClick={() => remove(index)}
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    <button
                      type="button"
                      onClick={() => push('')}
                    >
                      Add Item
                    </button>
                  </div>
                )}
              />
              {/* <MultipleImageInput
                label="Upload your Academic Documents (Max of 4 DOCS)"
                imageUrls={docs}
                setImageUrls={setDocs}
                endpoint="doctorProfessionDocs"
              /> */}
              <MultipleFileUpload
              label="Upload your Academic Documents (Max of 4 DOCS)"
              fileUrls={docs}
              setFileUrls={setDocs}
              endpoint="additionalFiles"  // Use the new endpoint name here
              />
            </div>
            <div className="mt-8 flex justify-center items-center">
              <SubmitButton
                title="Save and Continue"
                isLoading={isLoading}
                loadingTitle="Saving please wait..."
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
