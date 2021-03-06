import { Analytics, Event, PageHit } from "expo-analytics";
// @ts-ignore
import ExpoMixpanelAnalytics from "expo-mixpanel-analytics";
import { config } from "../config";

class MyAnalytics {
  ga?: Analytics;
  mixpanel?: ExpoMixpanelAnalytics;

  constructor() {
    if (config.analytics.googleTid) {
      this.ga = new Analytics(config.analytics.googleTid, undefined, {
        debug: __DEV__
      });
    }

    if (config.analytics.mixpanelProjectToken) {
      this.mixpanel = new ExpoMixpanelAnalytics(
        config.analytics.mixpanelProjectToken
      );
    }
  }

  identify(id: string): void {
    if (this.mixpanel) {
      this.mixpanel.identify(id);
    }
    // @ts-ignore
    if (this.ga && this.ga.parameters) {
      // @ts-ignore
      this.ga.parameters.uid = id;
    }
  }

  // tslint:disable-next-line:no-any
  async track(name: string, props: Record<string, any>): Promise<void> {
    if (this.mixpanel) {
      this.mixpanel.track(name, props);
    }

    if (!this.ga) {
      return;
    }

    if (name.startsWith("page_view_")) {
      await this.ga.hit(new PageHit(name));
    } else if (name.startsWith("tap_")) {
      await this.ga.event(new Event("tap", name, props.id));
    } else {
      await this.ga.event(new Event(name, name));
    }
  }

  people_delete_user(): void {
    if (this.mixpanel) {
      this.mixpanel.people_delete_user();
    }
  }
}

const analytics = new MyAnalytics();

export { analytics };
