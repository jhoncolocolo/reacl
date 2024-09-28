import { NavigateFunction } from 'react-router-dom';

class NavigationService {
  private static navigate: NavigateFunction;

  static setNavigate(navigateFunction: NavigateFunction) {
    NavigationService.navigate = navigateFunction;
  }

  static goToUnauthorized() {
    if (NavigationService.navigate) {
      NavigationService.navigate("/unauthorized");
    } else {
      console.error("Navigate function not initialized");
    }
  }
}

export default NavigationService;