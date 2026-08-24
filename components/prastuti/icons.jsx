import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowRight";
import { ArrowsClockwiseIcon } from "@phosphor-icons/react/dist/ssr/ArrowsClockwise";
import { ArrowsLeftRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowsLeftRight";
import { BuildingsIcon } from "@phosphor-icons/react/dist/ssr/Buildings";
import { CameraIcon } from "@phosphor-icons/react/dist/ssr/Camera";
import { CarIcon } from "@phosphor-icons/react/dist/ssr/Car";
import { ChartBarIcon } from "@phosphor-icons/react/dist/ssr/ChartBar";
import { CheckCircleIcon } from "@phosphor-icons/react/dist/ssr/CheckCircle";
import { ClipboardTextIcon } from "@phosphor-icons/react/dist/ssr/ClipboardText";
import { ClockCounterClockwiseIcon } from "@phosphor-icons/react/dist/ssr/ClockCounterClockwise";
import { CpuIcon } from "@phosphor-icons/react/dist/ssr/Cpu";
import { EnvelopeSimpleIcon } from "@phosphor-icons/react/dist/ssr/EnvelopeSimple";
import { FileTextIcon } from "@phosphor-icons/react/dist/ssr/FileText";
import { InfoIcon } from "@phosphor-icons/react/dist/ssr/Info";
import { LinkSimpleIcon } from "@phosphor-icons/react/dist/ssr/LinkSimple";
import { ListIcon } from "@phosphor-icons/react/dist/ssr/List";
import { MapPinIcon } from "@phosphor-icons/react/dist/ssr/MapPin";
import { RoadHorizonIcon } from "@phosphor-icons/react/dist/ssr/RoadHorizon";
import { ShieldCheckIcon } from "@phosphor-icons/react/dist/ssr/ShieldCheck";
import { SpinnerGapIcon } from "@phosphor-icons/react/dist/ssr/SpinnerGap";
import { StorefrontIcon } from "@phosphor-icons/react/dist/ssr/Storefront";
import { TrafficSignalIcon } from "@phosphor-icons/react/dist/ssr/TrafficSignal";
import { WarningCircleIcon } from "@phosphor-icons/react/dist/ssr/WarningCircle";
import { WrenchIcon } from "@phosphor-icons/react/dist/ssr/Wrench";
import { XIcon } from "@phosphor-icons/react/dist/ssr/X";

const ICON_REGISTRY = Object.freeze({
  activity: ClockCounterClockwiseIcon,
  anprPilot: CameraIcon,
  arrow: ArrowRightIcon,
  assessment: ClipboardTextIcon,
  commercialOperations: StorefrontIcon,
  comingNext: RoadHorizonIcon,
  compatibility: LinkSimpleIcon,
  controller: CpuIcon,
  empty: FileTextIcon,
  error: WarningCircleIcon,
  information: InfoIcon,
  integration: WrenchIcon,
  loading: SpinnerGapIcon,
  mail: EnvelopeSimpleIcon,
  menu: ListIcon,
  operate: ChartBarIcon,
  residentialAccess: BuildingsIcon,
  scope: ShieldCheckIcon,
  statusInformation: InfoIcon,
  statusOnline: CheckCircleIcon,
  statusPending: TrafficSignalIcon,
  statusUnknown: ClockCounterClockwiseIcon,
  sync: ArrowsClockwiseIcon,
  vehicle: CarIcon,
  verified: CheckCircleIcon,
  close: XIcon,
  crossCheck: ArrowsLeftRightIcon,
  location: MapPinIcon
});

export const ICON_KEYS = Object.freeze(Object.keys(ICON_REGISTRY));

export function ParktekIcon({ name, size = 24, weight = "regular", className }) {
  const Icon = ICON_REGISTRY[name];

  if (!Icon) {
    throw new Error(`Unknown ParkTek semantic icon: ${name}`);
  }

  return (
    <Icon
      aria-hidden="true"
      className={className}
      focusable="false"
      size={size}
      weight={weight}
    />
  );
}
