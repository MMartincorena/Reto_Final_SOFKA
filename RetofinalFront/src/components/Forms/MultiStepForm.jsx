import { Step, StepLabel, Stepper } from '@mui/material';
import { Form, Formik } from 'formik';
import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { setFormFeo } from '../../store/slices/formState';
import { FormNavigation } from './FormNavigation';

export const MultiStepForm = ({children, initialValues, onSubmit}) => {
    const { multiStepFormValue } = useSelector((state) => state.formState)
    const [stepNumber, setStepNumber] = useState(0)
    const dispatchFea = useDispatch()
    const steps = React.Children.toArray(children);

    const [snapshot, setSnapshot] = useState(initialValues)

    const step = steps[stepNumber];
    const totalSteps = steps.length;
    const isLastStep = stepNumber === totalSteps - 1;

    const next = (values) => {
        if(stepNumber == 1 && multiStepFormValue.hora == '08:00' ){
            dispatchFea(setFormFeo(true))
                setTimeout(() => {
                  dispatchFea(setFormFeo(false))
                }, 4000);
        } else {
            setSnapshot(values)
        setStepNumber(stepNumber + 1)
        }
    }
    //setSnapshot(values)
    //setStepNumber(stepNumber + 1)
    const previous = (values) => {
        setSnapshot(values)
        setStepNumber(stepNumber - 1)
    }

    const handleSubmit = async (values, actions) => {
        
        if(step.props.onSubmit) {
            await step.props.onSubmit(values)
        }

        if(isLastStep) {
            return onSubmit(values, actions)
        } else {
            actions.setTouched({})
            next(values)
        }
    }

    return (
    <div>
        <Formik 
            initialValues={snapshot} 
            onSubmit={handleSubmit} 
            //validationSchema={step.props.validationSchema} 
        >
            {(formik) => 
            <Form>

                <Stepper activeStep={stepNumber}>
                    {steps.map(currentStep => {
                        const label = currentStep.props.stepName;

                        return <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    })}
                </Stepper>

                {step}

                    <FormNavigation 
                        isLastStep={isLastStep} 
                        hasPrevious={stepNumber > 0 } 
                        onBackClick={()=> previous(formik.values)}
                    />
                </Form>}
        </Formik>
    </div>
  )
}

export const FormStep = ({ stepName = '', children }) => children;