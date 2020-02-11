// Copyright(C) 2019, CERN
// This software is distributed under the terms of the GNU General Public
// Licence version 3(GPL Version 3), copied verbatim in the file "LICENSE".
// In applying this license, CERN does not waive the privileges and immunities
// granted to it by virtue of its status as Intergovernmental Organization
// or submit itself to any jurisdiction.
import { ElementRef } from '@angular/core';

export interface IReCAPTCHA {

   execute(optWidgetId?: string): void;
   render(container: ElementRef | string, parameters: { [key: string]: string }): void;
   reset(optWidgetId?: string): void;
   getResponse(optWidgetId?: string): string;
}
