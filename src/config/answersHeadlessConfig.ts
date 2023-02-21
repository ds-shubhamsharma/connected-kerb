import { AnswersHeadlessProvider } from '@yext/answers-headless-react';

type HeadlessProviderProps = Parameters<typeof AnswersHeadlessProvider>[0];

export const answersHeadlessConfig: HeadlessProviderProps = {
  apiKey: '6a1cb813428a1e4afb70a2d7acdba073',
  verticalKey : "locations",
  experienceKey: 'connected-search',
  locale: 'en',
  sessionTrackingEnabled: true
};






