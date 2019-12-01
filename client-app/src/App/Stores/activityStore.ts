import { observable, action, computed, configure, runInAction } from "mobx";
import { createContext, SyntheticEvent } from "react";
import { IActivity } from "../Models/activity";
import agent from "../API/agent";

configure({ enforceActions: "always" });

class ActivityStore {
  @observable activityRegistry = new Map();
  @observable activities: IActivity[] = [];
  @observable loadingInitial = false;
  @observable selectedActivity: IActivity | undefined = undefined; // Selected Activity to ActivityDetails
  @observable editMode = false; // Edit Mode for Form to show - ActivityDashboard
  @observable submitting = false;
  @observable target = "";

  @action loadingActivities = async () => {
    this.loadingInitial = true;
    try {
      const activitiesdata = await agent.Activities.list();

      runInAction("loading Activities", () => {
        activitiesdata.forEach(activity => {
          activity.date = activity.date.split(".")[0];
          //this.activities.push(activity);
          this.activityRegistry.set(activity.id, activity);
        });
        this.loadingInitial = false;
      });
    } catch (error) {
      console.log(error);
      this.loadingInitial = false;
    }

    // agent.Activities.list()
    //   .then(activitiesdata => {
    //     activitiesdata.forEach(activity => {
    //       activity.date = activity.date.split(".")[0];
    //       this.activities.push(activity);
    //     });
    //   })
    //   .finally(() => (this.loadingInitial = false));
  };

  @computed get activitiesByDate() {
    // return this.activities.sort(
    //   (a, b) => Date.parse(a.date) - Date.parse(b.date)
    // );
    return Array.from(this.activityRegistry.values()).sort(
      (a, b) => Date.parse(a.date) - Date.parse(b.date)
    );
  }

  // Get Activity Based on Id
  @action getActivity = (id: string) => {
    // this.selectedActivity = this.activities.find(a => a.id === id);
    this.selectedActivity = this.activityRegistry.get(id);
    this.editMode = false;
  };

  @action createActivity = async (activity: IActivity) => {
    this.submitting = true;
    await agent.Activities.create(activity);
    runInAction("createActivity", () => {
      this.editMode = false;
      //this.activities.push(activity);
      this.activityRegistry.set(activity.id, activity);
      this.submitting = false;
    });
  };

  @action editActivity = async (activity: IActivity) => {
    this.submitting = true;
    try {
      await agent.Activities.update(activity);
      runInAction("EditActivity", () => {
        this.activityRegistry.set(activity.id, activity);
        this.selectedActivity = activity;
        this.editMode = false;
        this.submitting = false;
      });
    } catch (error) {
      runInAction("EditActivityError", () => {
        this.submitting = false;
      });
      console.log(error);
    }
  };

  @action deleteActivity = async (
    event: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => {
    this.submitting = true;
    this.target = event.currentTarget.name;
    try {
      await agent.Activities.delete(id);
      runInAction("deleteActivity", () => {
        this.activityRegistry.delete(id);
        this.submitting = false;
        this.target = "";
      });
    } catch (error) {
      runInAction("deleteActivityError", () => {
        this.submitting = false;
      });

      this.target = "";
    }
  };

  @action openCreatForm = () => {
    this.editMode = true;
    this.selectedActivity = undefined;
  };

  @action openEditForm = (id: string) => {
    this.selectedActivity = this.activityRegistry.get(id);
    this.editMode = true;
  };
  @action cancelSelectedActivity = () => {
    this.selectedActivity = undefined;
  };
  @action cancelOpenForm = () => {
    this.editMode = false;
  };
}

export default createContext(new ActivityStore());
