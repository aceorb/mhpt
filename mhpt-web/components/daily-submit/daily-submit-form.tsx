"use client";

import { useState } from "react";
import { Card, CardBody, Switch, Select, SelectItem, Divider, useDisclosure, DatePicker } from "@nextui-org/react";
import { Input } from "@nextui-org/input";
import { CardFooter } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import { getLocalTimeZone, today} from "@internationalized/date";


import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/modal";
import { LikertScaleGroup } from "@/components/radiogroup";
import {
  ActivityChoice,
  AnxietyChoice,
  MoodChoice,
  SleepChoice,
  SocialChoice,
  StressChoice,
  SymptomsOfDepressionChoice,
} from "@/common/constants";
import FormLabel from "@/components/daily-submit/form-label";
import FormRow from "@/components/daily-submit/form-row";
import FormColumn from "@/components/daily-submit/form-column";
import api from '../../services/api'

export default function DailySubmitForm() {
  const [date, setDate] = useState(today(getLocalTimeZone()))
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [modalMessage, setModalMessage] = useState('');
  const [modalTitle, setModalTitle] = useState('');

  const [mentalData, setMentalData] = useState({
    mood: '',
    anxiety: '',
    sleepHours: '',
    sleepQuality: '',
    sleepDisturb:'',
    physicalActivity: '',
    physicalActivityDuration: '',
    socialInteractions: '',
    stressLevels: '',
    symptoms: '',
    symptomLevels: '',
    symptomsPresence: false,

  });

  const showMessageModal = (title: string, message: string) => {
    setModalMessage(message);
    setModalTitle(title)
    onOpen();
  }
  const handleChange = (name: string, value: string | boolean | undefined) => {
    setMentalData({ ...mentalData, [name]: value });
  };

  const checkValidation = () => {
    const paramData = {
      date: date.toString(),
      mood: parseInt(mentalData.mood) || 0,
      anxiety: parseInt(mentalData.anxiety) || 0,
      sleepHours: parseInt(mentalData.sleepHours) || 0,
      sleepQuality: parseInt(mentalData.sleepQuality) || 0,
      sleepDisturb: parseInt(mentalData.sleepDisturb) || 0,
      physicalActivity: parseInt(mentalData.physicalActivity) || 0,
      physicalActivityDuration: parseInt(mentalData.physicalActivityDuration) || 0,
      socialInteractions: parseInt(mentalData.socialInteractions) || 0,
      stressLevels: parseInt(mentalData.stressLevels) || 0,
      symptoms: parseInt(mentalData.symptoms) || 0,
      symptomLevels: parseInt(mentalData.symptomLevels) || 0,
      symptomsPresence: mentalData.symptomsPresence,
    }
    if(!paramData.mood){
      showMessageModal('Warning', 'Select Mood Ratings');
      return false;
    }
    if(!paramData.anxiety){
      showMessageModal('Warning', 'Select Anxiety Levels');
      return false;
    }
    if(paramData.sleepHours < 0 || paramData.sleepHours > 24){
      showMessageModal('Warning', 'Input Sleep Hours');
      return false;
    }
    if(!paramData.sleepQuality){
      showMessageModal('Warning', 'Select Sleep Quality');
      return false;
    }
    if(paramData.sleepDisturb < 0){
      showMessageModal('Warning', 'Input Sleep Disturb');
      return false;
    }
    if(!paramData.physicalActivity){
      showMessageModal('Warning', 'Select Physical Activity');
      return false;
    }
    if(paramData.physicalActivityDuration < 0){
      showMessageModal('Warning', 'Input Physical Activity Duration');
      return false;
    }
    if(!paramData.socialInteractions){
      showMessageModal('Warning', 'Select Social Interactions');
      return false;
    }
    if(!paramData.stressLevels){
      showMessageModal('Warning', 'Stress Levels:');
      return false;
    }
    if(!paramData.stressLevels){
      showMessageModal('Warning', 'Stress Levels:');
      return false;
    }
    return true;
  }
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if(checkValidation()){
      try {
        const paramData = {
          date: date.toString(),
          mood: parseInt(mentalData.mood) || 0,
          anxiety: parseInt(mentalData.anxiety) || 0,
          sleepHours: parseInt(mentalData.sleepHours) || 0,
          sleepQuality: parseInt(mentalData.sleepQuality) || 0,
          sleepDisturb: parseInt(mentalData.sleepDisturb) || 0,
          physicalActivity: parseInt(mentalData.physicalActivity) || 0,
          physicalActivityDuration: parseInt(mentalData.physicalActivityDuration) || 0,
          socialInteractions: parseInt(mentalData.socialInteractions) || 0,
          stressLevels: parseInt(mentalData.stressLevels) || 0,
          symptoms: mentalData.symptomsPresence ? (parseInt(mentalData.symptoms) || 0) : 0,
          symptomLevels: mentalData.symptomsPresence ? (parseInt(mentalData.symptomLevels) || 0) : 0,
          symptomsPresence: mentalData.symptomsPresence,
        }
        const result = await api.submitDailyLog(paramData);
        if(result.success) {
          showMessageModal('Success', 'Daily Mental Log Submitted Successfully.');
        }
        else {
          showMessageModal('Failed', 'Error occured.');
        }
      } catch (error) {
        showMessageModal('Failed', 'Error occured.');
        console.error('Error submitting log:', error);
      }
    }

  };

  return (
    <div className="flex flex-col gap-4">
      <DatePicker
        label={"Date:"}
        className="max-w-[284px] mt-8"
        labelPlacement="outside-left"
        value={date} onChange={setDate}
      />
      <form onSubmit={handleSubmit}>
        <Card >
          <CardBody className="gap-8">
            <FormRow>
              <FormLabel text="Mood Ratings:" />
              <FormColumn>
                <LikertScaleGroup data={MoodChoice} value={mentalData.mood} onValueChange={(value)=>{handleChange('mood', value)}} />
              </FormColumn>
            </FormRow>
            <FormRow>
              <FormLabel text="Anxiety Levels:" />
              <FormColumn>
                <LikertScaleGroup data={AnxietyChoice} value={mentalData.anxiety} onValueChange={(value)=>{handleChange('anxiety', value)}}/>
              </FormColumn>
            </FormRow>
            <FormRow>
              <FormLabel text="Sleep Patterns:" />
              <FormColumn>
                <Input
                  className="w-32"
                  endContent={
                    <div className="pointer-events-none flex items-center">
                      <span className="text-default-400 text-small">h</span>
                    </div>
                  }
                  label="Sleep Hour"
                  labelPlacement="outside-left"
                  placeholder="0"
                  type="number"
                  value={mentalData.sleepHours}
                  onValueChange={(value)=>{handleChange('sleepHours', value)}}
                />
                <LikertScaleGroup data={SleepChoice} value={mentalData.sleepQuality} onValueChange={(value)=>{handleChange('sleepQuality', value)}}/>
                <Input
                  className="w-32"
                  label="Disturb"
                  labelPlacement="outside-left"
                  placeholder="0"
                  type="number"
                  value={mentalData.sleepDisturb}
                  onValueChange={(value)=>{handleChange('sleepDisturb', value)}}
                />
              </FormColumn>
            </FormRow>
            <FormRow>
              <FormLabel text="Physical Activity:" />
              <FormColumn>
                <LikertScaleGroup data={ActivityChoice} value={mentalData.physicalActivity} onValueChange={(value)=>{handleChange('physicalActivity', value)}}/>
                <Input
                  className="w-32"
                  label="Duration"
                  labelPlacement="outside-left"
                  placeholder="0"
                  type="number"
                  value={mentalData.physicalActivityDuration}
                  onValueChange={(value)=>{handleChange('physicalActivityDuration', value)}}
                />
              </FormColumn>
            </FormRow>
            <FormRow>
              <FormLabel text="Social Interactions:" />
              <FormColumn>
                <LikertScaleGroup data={SocialChoice}  value={mentalData.socialInteractions} onValueChange={(value)=>{handleChange('socialInteractions', value)}}/>
              </FormColumn>
            </FormRow>
            <FormRow>
              <FormLabel text="Stress Levels:" />
              <FormColumn>
                <LikertScaleGroup data={StressChoice}  value={mentalData.stressLevels} onValueChange={(value)=>{handleChange('stressLevels', value)}}/>
              </FormColumn>
            </FormRow>
            <FormRow>
              <FormLabel text="Symptoms of Depression:" />
              <FormColumn>
                <Switch aria-label="Automatic updates"  isSelected={mentalData.symptomsPresence} onValueChange={(value)=>{handleChange('symptomsPresence', value)}}/>
                <div className={`flex w-full ${mentalData.symptomsPresence ? 'visible': 'invisible'}`}>
                  <LikertScaleGroup data={AnxietyChoice}  value={mentalData.symptomLevels} onValueChange={(value)=>{handleChange('symptomLevels', value)}}/>
                  <Select className="max-w-48" selectedKeys={[mentalData.symptoms]} onSelectionChange={(value) => {handleChange('symptoms', value.currentKey)}}>
                    {SymptomsOfDepressionChoice.map((item) => (
                      <SelectItem key={item.value}>{item.text}</SelectItem>
                    ))}
                  </Select>
                </div>

              </FormColumn>
            </FormRow>
          </CardBody>
          <Divider/>
          <CardFooter>
            <div className="flex justify-center items-center w-full">
              <Button type="submit" color="primary" variant="shadow" className="w-32">
                Submit
              </Button>
            </div>
          </CardFooter>
        </Card>
        <Modal
          size='xs'
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">{modalTitle}</ModalHeader>
                <ModalBody>
                  <p>
                    {modalMessage}
                  </p>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </form>
    </div>

  );
}
