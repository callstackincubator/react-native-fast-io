//
//  RCTUtilsWrapper.m
//  FastIO
//
//  Created by Mike Grabowski on 10/11/2024.
//

#import "RCTUtilsWrapper.h"
#import <React/RCTUtils.h>

@implementation RCTUtilsWrapper
+ (UIViewController *)getPresentedViewController {
  return RCTPresentedViewController();
}
@end
