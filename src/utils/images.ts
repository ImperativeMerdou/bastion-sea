// Image utility - graceful loading with fallback for missing images

// Scene background mappings
export const sceneBackgrounds: Record<string, string> = {
  // Prologue scenes
  'prologue_01': 'scene_prison_hold.webp',
  'prologue_02': 'scene_prison_hold.webp',
  'prologue_03': 'scene_prison_hold.webp',
  'prologue_04': 'scene_prison_hold.webp',
  'prologue_05': 'scene_prison_hold.webp',
  'prologue_06': 'scene_transport_battle.webp',
  'prologue_07': 'scene_transport_battle.webp',
  'prologue_08': 'scene_transport_battle.webp',
  'prologue_09': 'scene_transport_battle.webp',
  'prologue_choice_01': 'scene_transport_battle.webp',
  'prologue_10': 'scene_transport_battle.webp',
  'prologue_11': 'scene_transport_battle.webp',
  'prologue_12': 'scene_transport_battle.webp',
  'prologue_final_choice': 'scene_transport_battle.webp',
  'prologue_escape_final': 'scene_transport_battle.webp',
  'prologue_end': 'scene_tavven_shoal.webp',

  // Tavven arrival
  'arrival_01': 'scene_tavven_shoal.webp',
  'arrival_02': 'scene_tavven_shoal.webp',
  'arrival_03': 'scene_tavven_shoal.webp',
  'arrival_04': 'scene_fish_market.webp',
  'arrival_05': 'scene_fish_market.webp',
  'arrival_choice': 'scene_fish_market.webp',
  'arrival_06': 'scene_fish_market.webp',
  'arrival_07': 'scene_fish_market.webp',

  // Dockside confrontation
  'dock_01': 'scene_fish_market.webp',
  'dock_02': 'scene_kolmari_confrontation.webp',
  'dock_02a': 'scene_kolmari_confrontation.webp',
  'dock_02b': 'scene_kolmari_confrontation.webp',
  'dock_02c': 'scene_kolmari_confrontation.webp',
  'dock_02d': 'scene_kolmari_confrontation.webp',
  'dock_03': 'scene_kolmari_confrontation.webp',
  'dock_04': 'scene_kolmari_confrontation.webp',
  'dock_05': 'scene_kolmari_confrontation.webp',
  'dock_06': 'scene_kolmari_confrontation.webp',
  'dock_07': 'scene_kolmari_confrontation.webp',
  'dock_08': 'scene_fish_market.webp',
  'dock_08a': 'scene_fish_market.webp',
  'dock_08b': 'scene_fish_market.webp',
  'dock_08c': 'scene_fish_market.webp',
  'dock_08d': 'scene_fish_market.webp',
  'dock_08e': 'scene_fish_market.webp',
  'dock_09': 'scene_fish_market.webp',
  'dock_10': 'scene_fish_market.webp',
  'dock_final': 'scene_tavven_shoal.webp',

  // Act 1 intel
  'intel_01': 'scene_tavven_shoal.webp',
  'intel_02': 'scene_tavven_shoal.webp',
  'intel_02a': 'scene_tavven_shoal.webp',
  'intel_02b': 'scene_tavven_shoal.webp',
  'intel_03': 'scene_tavven_shoal.webp',
  'intel_03a': 'scene_tavven_shoal.webp',
  'intel_03b': 'scene_tavven_shoal.webp',
  'intel_04': 'scene_crew_gathering.webp',
  'intel_04a': 'scene_crew_gathering.webp',
  'intel_05': 'scene_fish_market.webp',
  'intel_06': 'scene_fish_market.webp',
  'intel_07': 'scene_tavven_shoal.webp',
  'intel_07a': 'scene_tavven_shoal.webp',
  'intel_07b': 'scene_tavven_shoal.webp',
  'intel_08': 'scene_tavven_shoal.webp',
  'intel_08a': 'scene_tavven_shoal.webp',
  'intel_08b': 'scene_tavven_shoal.webp',
  'intel_09': 'scene_tavven_shoal.webp',
  'intel_09a': 'scene_tavven_shoal.webp',
  'intel_09b': 'scene_tavven_shoal.webp',
  'intel_10': 'scene_tavven_shoal.webp',
  'intel_10a': 'scene_tavven_shoal.webp',
  'intel_11': 'scene_crew_gathering.webp',
  'intel_11a': 'scene_crew_gathering.webp',
  'intel_conquest_choice': 'scene_crew_gathering.webp',

  // Crew Identity
  'identity_01': 'scene_fish_market.webp',
  'identity_02': 'scene_fish_market.webp',
  'identity_name_choice': 'scene_fish_market.webp',
  'identity_03': 'scene_fish_market.webp',
  'identity_flag_choice': 'scene_fish_market.webp',
  'identity_04': 'scene_fish_market.webp',

  // Rival Introduction
  'rival_01': 'scene_tavven_shoal.webp',
  'rival_02': 'scene_tavven_shoal.webp',
  'rival_03': 'scene_fish_market.webp',
  'rival_04': 'scene_fish_market.webp',
  'rival_05': 'scene_fish_market.webp',
  'rival_06': 'scene_fish_market.webp',

  // Prologue Combat
  'prologue_combat': 'scene_prison_hold.webp',

  // Conquest: Force
  'force_01': 'scene_crew_gathering.webp',
  'force_02': 'scene_crew_gathering.webp',
  'force_03': 'scene_harbor_board.webp',
  'force_04': 'scene_harbor_board.webp',
  'force_05': 'scene_harbor_board.webp',
  'force_06': 'scene_harbor_board.webp',
  'force_07': 'scene_harbor_board.webp',
  'force_08': 'scene_harbor_board.webp',
  'force_09': 'scene_tavven_shoal.webp',

  // Conquest: Negotiation
  'negotiate_01': 'scene_crew_gathering.webp',
  'negotiate_02': 'scene_crew_gathering.webp',
  'negotiate_03': 'scene_harbor_board.webp',
  'negotiate_04': 'scene_harbor_board.webp',
  'negotiate_05': 'scene_harbor_board.webp',
  'negotiate_06': 'scene_kolmari_confrontation.webp',
  'negotiate_07': 'scene_tavven_shoal.webp',

  // Conquest: Economic
  'economic_01': 'scene_crew_gathering.webp',
  'economic_02': 'scene_tavven_shoal.webp',
  'economic_03': 'scene_tavven_shoal.webp',
  'economic_04': 'scene_fish_market.webp',
  'economic_05': 'scene_kolmari_confrontation.webp',
  'economic_06': 'scene_harbor_board.webp',
  'economic_07': 'scene_harbor_board.webp',
  'economic_08': 'scene_tavven_shoal.webp',

  // Conquest: Subversion
  'subversion_01': 'scene_crew_gathering.webp',
  'subversion_02': 'scene_crew_gathering.webp',
  'subversion_03': 'scene_tavven_shoal.webp',
  'subversion_04': 'scene_fish_market.webp',
  'subversion_05': 'scene_tavven_shoal.webp',
  'subversion_06': 'scene_tavven_shoal.webp',
  'subversion_07': 'scene_harbor_board.webp',
  'subversion_08': 'scene_crew_gathering.webp',

  // Conquest aftermath
  'aftermath_01': 'scene_harbor_board.webp',
  'aftermath_02': 'scene_tavven_shoal.webp',
  'aftermath_03': 'scene_tavven_shoal.webp',
  'aftermath_04': 'scene_tavven_shoal.webp',

  // Exploration: Keldriss
  'keldriss_arrive_01': 'scene_keldriss.webp',
  'keldriss_arrive_02': 'scene_keldriss.webp',
  'keldriss_arrive_03': 'scene_keldriss.webp',
  'keldriss_arrive_04': 'scene_keldriss_market.webp',
  'keldriss_arrive_05': 'scene_keldriss.webp',

  // Exploration: Mossbreak
  'mossbreak_arrive_01': 'scene_mossbreak.webp',
  'mossbreak_arrive_02': 'scene_swamp_dock.webp',
  'mossbreak_arrive_03': 'scene_swamp_dock.webp',
  'mossbreak_arrive_04': 'scene_mossbreak.webp',
  'mossbreak_arrive_05': 'scene_mossbreak.webp',

  // Exploration: Coppervein
  'coppervein_arrive_01': 'scene_coppervein.webp',
  'coppervein_arrive_02': 'scene_coppervein.webp',
  'coppervein_arrive_03': 'scene_coppervein.webp',
  'coppervein_arrive_04': 'scene_coppervein.webp',
  'coppervein_arrive_dispute': 'scene_coppervein.webp',
  'coppervein_arrive_05': 'scene_coppervein.webp',
  'coppervein_arrive_06': 'scene_coppervein.webp',

  // Crew Events (first beat of each scene sets persistent background)
  // crew_events.ts
  'del_01_1': 'scene_tavern_night.webp',
  'del_02_1': 'scene_dock_rain.webp',
  'dra_01_1': 'scene_ship_galley.webp',
  'kov_01_1': 'scene_ship_deck_storm.webp',
  'suu_01_1': 'scene_ocean_night_glow.webp',
  'suu_01_5': 'scene_rooftop_night.webp',
  'tes_01_1': 'scene_ship_deck.webp',
  // crew_events_new.ts
  'dra_02_1': 'scene_ship_galley.webp',
  'dra_03_1': 'scene_ship_deck.webp',
  'kov_02_1': 'scene_ship_deck_storm.webp',
  'kov_03_1': 'scene_ship_deck.webp',
  'suu_02_1': 'scene_ocean_night_glow.webp',
  'suu_03_1': 'scene_rooftop_night.webp',
  'tes_02_1': 'scene_ship_deck.webp',
  'tes_03_1': 'scene_ship_deck.webp',
  'orr_01_1': 'scene_ship_deck.webp',
  'orr_02_1': 'scene_ship_deck.webp',
  'orr_03_1': 'scene_ship_deck.webp',
  'vor_01_1': 'scene_ship_deck.webp',
  'vor_02_1': 'scene_ship_deck.webp',
  'vor_03_1': 'scene_ship_deck.webp',
  'del_03_1': 'scene_dock_rain.webp',
  // crew_events_04.ts
  'del_04_1': 'scene_captains_cabin.webp',
  'drag_04_1': 'scene_ship_galley.webp',
  'kov_04_1': 'scene_ship_deck_storm.webp',
  'suu_04_1': 'scene_rooftop_night.webp',
  'tes_04_1': 'scene_ship_deck.webp',
  'orr_04_1': 'scene_ship_deck.webp',
  'vor_04_1': 'scene_ship_deck.webp',

  // Keldriss Conquest
  'keldriss_conquest_01': 'scene_keldriss.webp',
  'keldriss_conquest_02': 'scene_keldriss_market.webp',
  'keldriss_conquest_03': 'scene_keldriss_market.webp',
  'keldriss_conquest_04': 'scene_keldriss.webp',

  // Durrek Garrison Exploration
  'durrek_arrive_01': 'scene_durrek_garrison.webp',
  'durrek_arrive_02': 'scene_durrek_garrison.webp',
  'durrek_arrive_03': 'scene_durrek_garrison.webp',
  'durrek_arrive_04': 'scene_durrek_garrison.webp',

  // Durrek Garrison Conquest
  'durrek_assault_01': 'scene_durrek_assault.webp',
  'durrek_assault_02': 'scene_durrek_assault.webp',
  'durrek_assault_03': 'scene_durrek_assault.webp',
  'durrek_assault_04': 'scene_durrek_garrison.webp',
  'durrek_assault_05': 'scene_durrek_garrison.webp',
  'durrek_assault_06': 'scene_durrek_garrison.webp',

  // Coppervein Conquest
  'coppervein_conquest_01': 'scene_coppervein.webp',
  'coppervein_conquest_02': 'scene_coppervein_voting_hall.webp',
  'coppervein_conquest_03': 'scene_coppervein_voting_hall.webp',
  'coppervein_conquest_04': 'scene_coppervein_voting_hall.webp',
  'coppervein_conquest_05': 'scene_coppervein.webp',

  // Mossbreak Conquest
  'mossbreak_conquest_01': 'scene_mossbreak.webp',
  'mossbreak_conquest_02': 'scene_mossbreak_tavern.webp',
  'mossbreak_conquest_03': 'scene_mossbreak_tavern.webp',
  'mossbreak_conquest_04': 'scene_mossbreak_tavern.webp',

  // Exploration: Sorren's Flat
  'sorrens_arrive_01': 'scene_sorrens_flat.webp',
  'sorrens_arrive_02': 'scene_sorrens_flat.webp',
  'sorrens_arrive_03': 'scene_sorrens_market.webp',
  'sorrens_arrive_04': 'scene_sorrens_market.webp',
  'sorrens_arrive_05': 'scene_ship_cabin.webp',
  'sorrens_arrive_06': 'scene_sorrens_flat.webp',

  // Exploration: Mirrorwater
  'mirrorwater_arrive_01': 'scene_mirrorwater.webp',
  'mirrorwater_arrive_02': 'scene_mirrorwater.webp',
  'mirrorwater_arrive_03': 'scene_mirrorwater.webp',
  'mirrorwater_arrive_04': 'scene_mirrorwater_night.webp',
  'mirrorwater_arrive_05': 'scene_mirrorwater.webp',
  'mirrorwater_arrive_06': 'scene_mirrorwater.webp',

  // Exploration: Anvil Cay
  'anvil_arrive_01': 'scene_anvil_cay.webp',
  'anvil_arrive_02': 'scene_anvil_cay.webp',
  'anvil_arrive_03': 'scene_anvil_cay.webp',
  'anvil_arrive_04': 'scene_anvil_cay_shipyard.webp',
  'anvil_arrive_05': 'scene_ship_cabin.webp',
  'anvil_arrive_06': 'scene_anvil_cay_night.webp',

  // Conquest: Anvil Cay
  'anvil_conquest_01': 'scene_anvil_cay_night.webp',
  'anvil_conquest_02': 'scene_anvil_cay.webp',
  'anvil_conquest_03': 'scene_anvil_cay_shipyard.webp',
  'anvil_conquest_04': 'scene_anvil_cay_shipyard.webp',
  'anvil_conquest_05': 'scene_anvil_cay_night.webp',

  // Conquest: Sorren's Flat
  'sorrens_conquest_01': 'scene_sorrens_flat.webp',
  'sorrens_conquest_02': 'scene_sorrens_market.webp',
  'sorrens_conquest_03': 'scene_sorrens_market.webp',
  'sorrens_conquest_04': 'scene_sorrens_market.webp',
  'sorrens_conquest_05': 'scene_sorrens_flat_night.webp',

  // Conquest: Mirrorwater
  'mirrorwater_conquest_01': 'scene_mirrorwater.webp',
  'mirrorwater_conquest_02': 'scene_mirrorwater.webp',
  'mirrorwater_conquest_03': 'scene_mirrorwater.webp',
  'mirrorwater_conquest_04': 'scene_mirrorwater_night.webp',

  // Exploration: Windrow
  'windrow_arrive_01': 'scene_windrow.webp',
  'windrow_arrive_02': 'scene_windrow.webp',
  'windrow_arrive_03': 'scene_windrow.webp',
  'windrow_arrive_04': 'scene_windrow.webp',
  'windrow_arrive_05': 'scene_windrow.webp',
  'windrow_arrive_06': 'scene_windrow.webp',

  // Conquest: Windrow
  'windrow_conquest_01': 'scene_windrow.webp',
  'windrow_conquest_02': 'scene_windrow.webp',
  'windrow_conquest_03': 'scene_windrow_cliffs.webp',
  'windrow_conquest_04': 'scene_windrow.webp',
  'windrow_conquest_05': 'scene_windrow.webp',

  // Exploration: Ghostlight Reef
  'ghostlight_arrive_01': 'scene_ghostlight_reef.webp',
  'ghostlight_arrive_02': 'scene_ghostlight_reef.webp',
  'ghostlight_arrive_03': 'scene_ghostlight_reef.webp',
  'ghostlight_arrive_04': 'scene_ghostlight_reef_night.webp',
  'ghostlight_arrive_05': 'scene_ghostlight_reef_night.webp',

  // Conquest: Ghostlight Reef
  'ghostlight_conquest_01': 'scene_ghostlight_reef.webp',
  'ghostlight_conquest_02': 'scene_ghostlight_reef_night.webp',
  'ghostlight_conquest_03': 'scene_ghostlight_reef_night.webp',
  'ghostlight_conquest_04': 'scene_ghostlight_reef.webp',
  'ghostlight_conquest_05': 'scene_ghostlight_reef_night.webp',

  // Exploration: Vess Harbour
  'vess_arrive_01': 'scene_vess_harbour.webp',
  'vess_arrive_02': 'scene_vess_harbour.webp',
  'vess_arrive_03': 'scene_vess_harbour.webp',
  'vess_arrive_04': 'scene_vess_harbour.webp',
  'vess_arrive_05': 'scene_vess_harbour.webp',
  'vess_arrive_06': 'scene_vess_harbour.webp',

  // Exploration: Noon Island
  'noon_arrive_01': 'scene_noon_island.webp',
  'noon_arrive_02': 'scene_noon_island.webp',
  'noon_arrive_03': 'scene_noon_island.webp',
  'noon_arrive_04': 'scene_noon_island.webp',
  'noon_arrive_05': 'scene_noon_island.webp',

  // Conquest: Vess Harbour
  'vess_conquest_01': 'scene_ship_cabin.webp',
  'vess_conquest_02': 'scene_vess_harbour.webp',
  'vess_conquest_03': 'scene_vess_harbour_assault.webp',
  'vess_conquest_04': 'scene_vess_harbour_assault.webp',
  'vess_conquest_05': 'scene_vess_harbour_assault.webp',
  'vess_conquest_06': 'scene_vess_harbour_sunset.webp',

  // Conquest: Noon Island
  'noon_conquest_01': 'scene_noon_island.webp',
  'noon_conquest_02': 'scene_noon_island.webp',
  'noon_conquest_03': 'scene_noon_island.webp',
  'noon_conquest_04': 'scene_noon_island.webp',
  'noon_conquest_05': 'scene_noon_island.webp',

  // Delvessa Romance Scenes (first beat of each scene)
  'dr01_beat1_1': 'scene_ocean_night_glow.webp',
  'dr01_beat3_1': 'scene_captains_cabin.webp',
  'dr01_beat4_1': 'scene_ocean_night_glow.webp',
  'dr02_beat1_1': 'scene_ship_deck_storm.webp',
  'dr02_beat3_1': 'scene_captains_cabin.webp',
  'dr02_beat4_1': 'scene_captains_cabin.webp',
  'dr03_beat1_1': 'scene_ocean_night_glow.webp',
  'dr03_beat2_2': 'scene_captains_cabin.webp',
  'dr04_beat1_1': 'scene_ocean_night_glow.webp',

  // Act 2: Begin
  'act2_begin_01': 'scene_war_room.webp',
  'act2_begin_02': 'scene_war_room.webp',
  'act2_begin_03': 'scene_war_room.webp',
  'act2_begin_04': 'scene_war_room.webp',
  'act2_begin_05': 'scene_war_room.webp',
  'act2_begin_06': 'scene_war_room.webp',
  'act2_priority_military': 'scene_war_room.webp',
  'act2_priority_intelligence': 'scene_war_room.webp',
  'act2_priority_legitimacy': 'scene_war_room.webp',

  // Act 2: Ultimatum
  'ultimatum_01': 'scene_captains_cabin.webp',
  'ultimatum_02': 'scene_captains_cabin.webp',
  'ultimatum_03': 'scene_captains_cabin.webp',
  'ultimatum_04': 'scene_captains_cabin.webp',
  'ultimatum_05': 'scene_captains_cabin.webp',
  'ultimatum_06': 'scene_captains_cabin.webp',
  'ultimatum_reject_public': 'scene_captains_cabin.webp',
  'ultimatum_reject_private': 'scene_captains_cabin.webp',
  'ultimatum_stall': 'scene_captains_cabin.webp',
  'ultimatum_07': 'scene_ship_storm_battle.webp',
  'ultimatum_08': 'scene_ship_storm_battle.webp',

  // Act 2: Conqueror Contact
  'conqueror_01': 'scene_ship_night.webp',
  'conqueror_02': 'scene_ship_night.webp',
  'conqueror_03': 'scene_ship_night.webp',
  'conqueror_04': 'scene_conqueror_overlook.webp',
  'conqueror_05': 'scene_conqueror_overlook.webp',
  'conqueror_06': 'scene_conqueror_overlook.webp',
  'conqueror_accept': 'scene_conqueror_overlook.webp',
  'conqueror_reject': 'scene_conqueror_overlook.webp',
  'conqueror_delay': 'scene_conqueror_overlook.webp',
  'conqueror_07': 'scene_ship_night.webp',

  // Act 2: Blockade
  'blockade_01': 'scene_wardensea_fleet.webp',
  'blockade_02': 'scene_wardensea_fleet.webp',
  'blockade_03': 'scene_fleet_surrounded.webp',
  'blockade_04': 'scene_fleet_surrounded.webp',
  'blockade_05': 'scene_naval_battle.webp',
  'blockade_06': 'scene_naval_battle.webp',
  'blockade_07': 'scene_naval_battle.webp',
  'blockade_08': 'scene_naval_battle.webp',
  'blockade_force': 'scene_naval_battle.webp',
  'blockade_negotiate': 'scene_fleet_surrounded.webp',
  'blockade_tunnels': 'scene_fleet_surrounded.webp',

  // Act 2: Crew Council
  'council_01': 'scene_captains_cabin.webp',
  'council_02': 'scene_captains_cabin.webp',
  'council_03': 'scene_captains_cabin.webp',
  'council_04': 'scene_captains_cabin.webp',
  'council_05': 'scene_captains_cabin.webp',
  'council_06': 'scene_captains_cabin.webp',
  'council_07': 'scene_captains_cabin.webp',
  'council_expand': 'scene_captains_cabin.webp',
  'council_consolidate': 'scene_captains_cabin.webp',
  'council_08': 'scene_captains_cabin.webp',
  'council_conqueror_lean': 'scene_captains_cabin.webp',
  'council_independent': 'scene_captains_cabin.webp',
  'council_wardensea_moderates': 'scene_captains_cabin.webp',
  'council_09': 'scene_captains_cabin.webp',
  'council_10': 'scene_captains_cabin.webp',

  // Act 2: First Strike
  'strike_01': 'scene_harbor_siege.webp',
  'strike_02': 'scene_harbor_siege.webp',
  'strike_03': 'scene_harbor_siege.webp',
  'strike_04': 'scene_harbor_siege.webp',
  'strike_engage': 'scene_harbor_siege.webp',
  'strike_05': 'scene_harbor_siege.webp',
  'strike_06': 'scene_harbor_siege.webp',
  'strike_07': 'scene_harbor_siege.webp',
  'strike_08': 'scene_harbor_siege.webp',
  'strike_09': 'scene_harbor_siege.webp',

  // Act 2: Territory Crisis
  'crisis_01': 'scene_war_room.webp',
  'crisis_02': 'scene_war_room.webp',
  'crisis_03': 'scene_war_room.webp',
  'crisis_04': 'scene_war_room.webp',
  'crisis_05': 'scene_war_room.webp',
  'crisis_send_dragghen': 'scene_war_room.webp',
  'crisis_buy_compliance': 'scene_war_room.webp',
  'crisis_crush': 'scene_war_room.webp',
  'crisis_06': 'scene_war_room.webp',
  'crisis_07': 'scene_war_room.webp',

  // Act 2: Southern Gambit
  'gambit_01': 'scene_ship_deck_storm.webp',
  'gambit_02': 'scene_ship_deck_storm.webp',
  'gambit_03': 'scene_ship_deck_storm.webp',
  'gambit_04': 'scene_ship_deck_storm.webp',
  'gambit_05': 'scene_ship_deck_storm.webp',
  'gambit_06': 'scene_ship_deck_storm.webp',
  'gambit_07a': 'scene_ship_deck_storm.webp',
  'gambit_07b': 'scene_ship_deck_storm.webp',
  'gambit_07c': 'scene_ship_deck_storm.webp',
  'gambit_07d': 'scene_ship_deck_storm.webp',
  'gambit_07e': 'scene_ship_deck_storm.webp',
  'gambit_07f': 'scene_ship_deck_storm.webp',

  // Act 3: Begin
  'a3_begin_01': 'scene_war_room.webp',
  'a3_begin_02': 'scene_war_room.webp',
  'a3_begin_03': 'scene_war_room.webp',
  'a3_begin_04': 'scene_war_room.webp',
  'a3_begin_05': 'scene_war_room.webp',
  'a3_begin_06': 'scene_war_room.webp',

  // Act 3: Vasshen
  'a3_vasshen_01': 'scene_ship_night.webp',
  'a3_vasshen_02': 'scene_ship_night.webp',
  'a3_vasshen_03': 'scene_ship_night.webp',
  'a3_vasshen_04': 'scene_ship_night.webp',
  'a3_vasshen_05': 'scene_ship_night.webp',
  'a3_vasshen_06': 'scene_ship_night.webp',
  'a3_vasshen_07': 'scene_ship_night.webp',
  'a3_vasshen_08': 'scene_ship_night.webp',

  // Act 3: Conqueror Gambit
  'a3_conqueror_01': 'scene_conqueror_overlook.webp',
  'a3_conqueror_02': 'scene_conqueror_overlook.webp',
  'a3_conqueror_03_allied': 'scene_conqueror_overlook.webp',
  'a3_conqueror_03_rejected': 'scene_conqueror_overlook.webp',
  'a3_conqueror_03_pending': 'scene_conqueror_overlook.webp',
  'a3_conqueror_04': 'scene_conqueror_overlook.webp',
  'a3_conqueror_05_allied': 'scene_conqueror_overlook.webp',
  'a3_conqueror_05_hostile': 'scene_conqueror_overlook.webp',
  'a3_conqueror_06': 'scene_conqueror_overlook.webp',

  // Act 3: Ironclad
  'a3_ironclad_01': 'scene_fleet_surrounded.webp',
  'a3_ironclad_02': 'scene_conqueror_overlook.webp',
  'a3_ironclad_03': 'scene_harbor_siege.webp',
  'a3_ironclad_04': 'scene_harbor_siege.webp',
  'a3_ironclad_05': 'scene_harbor_siege.webp',
  'a3_ironclad_06': 'scene_fleet_surrounded.webp',

  // Act 3: Final Council
  'a3_council_01': 'scene_captains_cabin.webp',
  'a3_council_02': 'scene_captains_cabin.webp',
  'a3_council_02b': 'scene_captains_cabin.webp',
  'a3_council_02c': 'scene_captains_cabin.webp',
  'a3_council_03': 'scene_captains_cabin.webp',
  'a3_council_03b': 'scene_captains_cabin.webp',
  'a3_council_03c': 'scene_captains_cabin.webp',
  'a3_council_04': 'scene_captains_cabin.webp',
  'a3_council_04b': 'scene_captains_cabin.webp',
  'a3_council_04c': 'scene_captains_cabin.webp',
  'a3_council_04d': 'scene_captains_cabin.webp',
  'a3_council_05': 'scene_captains_cabin.webp',
  'a3_council_05b': 'scene_captains_cabin.webp',
  'a3_council_06': 'scene_captains_cabin.webp',
  'a3_council_06b': 'scene_captains_cabin.webp',
  'a3_council_07': 'scene_captains_cabin.webp',
  'a3_council_08': 'scene_captains_cabin.webp',
  'a3_council_09': 'scene_captains_cabin.webp',
  'a3_council_10': 'scene_captains_cabin.webp',

  // Act 3: Ending
  'a3_ending_01': 'scene_archipelago_vista.webp',
  'a3_ending_02': 'scene_archipelago_vista.webp',
  'a3_ending_03': 'scene_archipelago_vista.webp',
  'a3_ending_04': 'scene_archipelago_vista.webp',
  'a3_ending_05': 'scene_archipelago_vista.webp',
  'a3_ending_06': 'scene_archipelago_vista.webp',
  'a3_ending_07': 'scene_archipelago_vista.webp',
  'a3_ending_08': 'scene_archipelago_vista.webp',

  // Dragon Fruit activation
  'dragon_fruit_01': 'scene_ship_cabin.webp',
  'dragon_fruit_02': 'scene_ship_cabin.webp',
  'dragon_fruit_03': 'scene_ship_cabin.webp',
  'dragon_fruit_04': 'scene_dragon_transform.webp',
  'dragon_fruit_05': 'scene_dragon_transform.webp',
  'dragon_fruit_06': 'scene_dragon_transform.webp',
  'dragon_fruit_07a': 'scene_dragon_transform.webp',
  'dragon_fruit_07b': 'scene_dragon_transform.webp',
  'dragon_fruit_07c': 'scene_dragon_transform.webp',
  'dragon_fruit_07d': 'scene_dragon_transform.webp',
  'dragon_fruit_08': 'scene_ship_deck.webp',

  // King's Pressure awakening (standalone scene)
  'kings_pressure_awakening': 'scene_kings_pressure.webp',

  // Conquest aftermath crew reactions
  'aftermath_05': 'scene_captains_cabin.webp',
  'aftermath_06': 'scene_ship_deck_storm.webp',
  'aftermath_07': 'scene_tavven_shoal.webp',

  // Rotstone exploration
  'rotstone_arrive_01': 'scene_rotstone_approach.webp',
  'rotstone_arrive_02': 'scene_rotstone_approach.webp',
  'rotstone_arrive_03': 'scene_rotstone_approach.webp',
  'rotstone_arrive_04': 'scene_rotstone_approach.webp',
  'rotstone_arrive_05': 'scene_rotstone_approach.webp',
  'rotstone_arrive_choice': 'scene_rotstone_approach.webp',
  'rotstone_arrive_06': 'scene_rotstone_approach.webp',
  'rotstone_arrive_07': 'scene_rotstone_approach.webp',
  'rotstone_arrive_end': 'scene_rotstone_approach.webp',

  // Kirin arrival (Act 2 trigger)
  'kirin_01': 'scene_dock_night.webp',
  'kirin_02': 'scene_dock_night.webp',
  'kirin_03': 'scene_dock_night.webp',
  'kirin_04': 'scene_dock_night.webp',
  'kirin_05': 'scene_dock_night.webp',
  'kirin_06': 'scene_dock_night.webp',
  'kirin_confront_now': 'scene_dock_night.webp',
  'kirin_investigate_first': 'scene_dock_night.webp',
  'kirin_wait_and_watch': 'scene_dock_night.webp',
  'kirin_07': 'scene_dock_night.webp',
  'kirin_08': 'scene_dock_night.webp',
  'kirin_09': 'scene_dock_night.webp',
  'kirin_10': 'scene_dock_night.webp',

  // Kirin confrontation scene
  'kconf_01': 'scene_tavern_night.webp',
  'kconf_02': 'scene_tavern_night.webp',
  'kconf_03': 'scene_tavern_night.webp',
  'kconf_04': 'scene_tavern_night.webp',
  'kconf_05': 'scene_tavern_night.webp',
  'kconf_06': 'scene_tavern_night.webp',
  'kconf_07': 'scene_tavern_night.webp',
  'kconf_08': 'scene_tavern_night.webp',
  // Kirin confrontation branches
  'kconf_alliance_01a': 'scene_tavern_night.webp',
  'kconf_alliance_01b': 'scene_tavern_night.webp',
  'kconf_alliance_01c': 'scene_tavern_night.webp',
  'kconf_alliance_01d': 'scene_tavern_night.webp',
  'kconf_alliance_02a': 'scene_tavern_night.webp',
  'kconf_alliance_02b': 'scene_tavern_night.webp',
  'kconf_rivalry_01': 'scene_dock_night.webp',
  'kconf_rivalry_02': 'scene_dock_night.webp',
  'kconf_emotional_01': 'scene_tavern_night.webp',
  'kconf_emotional_02': 'scene_tavern_night.webp',
  'kconf_emotional_03': 'scene_tavern_night.webp',
  'kconf_end': 'scene_tavern_night.webp',

  // Prime Khoss blockade scene
  'pkhoss_01': 'scene_wardensea_fleet.webp',
  'pkhoss_02': 'scene_wardensea_fleet.webp',
  'pkhoss_03': 'scene_wardensea_blockade.webp',
  'pkhoss_04': 'scene_wardensea_blockade.webp',
  'pkhoss_05': 'scene_fleet_surrounded.webp',
  'pkhoss_06': 'scene_fleet_surrounded.webp',
  'pkhoss_07': 'scene_wardensea_blockade.webp',
  'pkhoss_08': 'scene_wardensea_blockade.webp',
  'pkhoss_09': 'scene_cabin_invasion.webp',
  'pkhoss_10': 'scene_wardensea_blockade.webp',
  'pkhoss_choice': 'scene_wardensea_blockade.webp',
  // Prime Khoss branches
  'pkhoss_negotiate_01': 'scene_wardensea_blockade.webp',
  'pkhoss_negotiate_02': 'scene_wardensea_blockade.webp',
  'pkhoss_negotiate_03': 'scene_wardensea_blockade.webp',
  'pkhoss_fight_01': 'scene_wardensea_blockade.webp',
  'pkhoss_fight_02': 'scene_wardensea_blockade.webp',

  // Epilogue
  'ep_kneel_01': 'scene_ship_deck.webp',
  'ep_kneel_02': 'scene_ship_deck.webp',
  'ep_kneel_03': 'scene_ship_deck.webp',
  'ep_kneel_04': 'scene_ship_deck.webp',
  'ep_delvessa_01': 'scene_captains_cabin.webp',
  'ep_delvessa_02': 'scene_captains_cabin.webp',
  'ep_delvessa_03': 'scene_captains_cabin.webp',
  'ep_bands_01': 'scene_ship_deck.webp',
  'ep_bands_02': 'scene_ship_deck.webp',
  'ep_bands_03': 'scene_ship_deck.webp',
  'ep_title_card': 'scene_archipelago_vista.webp',
};

// Character portrait mappings
export const characterPortraits: Record<string, string> = {
  'karyudon': 'karyudon_portrait.webp',
  'karyudon_young': 'karyudon_portrait_young.webp',
  'karyudon_captain': 'karyudon_portrait_captain.webp',
  'karyudon_captain_angry': 'karyudon_portrait_captain_angry.webp',
  'karyudon_captain_armed': 'karyudon_portrait_captain_armed.webp',
  'karyudon_captain_smirk': 'karyudon_portrait_captain_smirk.webp',
  'karyudon_hybrid': 'karyudon_portrait_hybrid.webp',
  'delvessa': 'delvessa_portrait.webp',
  'dragghen': 'dragghen_portrait.webp',
  'suulen': 'suulen_portrait.webp',
  'kovesse': 'kovesse_portrait.webp',
  'tessek': 'tessek_portrait.webp',
  'orren': 'orren_portrait.webp',
  'vorreth': 'vorreth_portrait.webp',
  'pettha_koss': 'pettha_koss_portrait.webp',
  'tessurren': 'tessurren_portrait.webp',
  'tessurren_dolch': 'tessurren_portrait.webp',
  'hella': 'hella_portrait.webp',
  'rukessa': 'rukessa_portrait.webp',
  'iren_saltz': 'iren_saltz_portrait.webp',
  'captain_drezh': 'captain_drezh_portrait.webp',
  'maavi': 'maavi_portrait.webp',
  'maren': 'maren_portrait.webp',
  'tessavarra': 'tessavarra_portrait.webp',
  'vasshen': 'vasshen_portrait.webp',
  // Rival
  'sable_venn': 'sable_venn_portrait.webp',
  'rikkart': 'rikkart_portrait.webp',
  // Island Villains
  'kellan_gyre': 'kellan_gyre_portrait.webp',
  'moth_calaveras': 'moth_calaveras_portrait.webp',
  'brother_ossian': 'brother_ossian_portrait.webp',
  'merrik_sevaine': 'merrik_sevaine_portrait.webp',
  'maren_kade': 'maren_kade_portrait.webp',
  'captain_hull': 'captain_hull_portrait.webp',
  'forge_mother_tessik': 'forge_mother_tessik_portrait.webp',
  'the_orchid': 'the_orchid_portrait.webp',
  'vessel_ahn': 'vessel_ahn_portrait.webp',
  'echo_salis': 'echo_salis_portrait.webp',
  // Kirin Arc
  'kirin_akkan': 'kirin_akkan_portrait.webp',
  'kirin': 'kirin_akkan_portrait.webp',
  // Wardensea Prime
  'prime_khoss': 'prime_khoss_portrait.webp',
  // Generic NPC portraits
  'wardensea_officer': 'wardensea_officer_portrait.webp',
  'wardensea_commander': 'wardensea_commander_portrait.webp',
  'thalessi_officer': 'thalessi_officer_portrait.webp',
  'mine_worker': 'mine_worker_portrait.webp',
  'bureaucrat': 'bureaucrat_portrait.webp',
  'tavern_keeper': 'tavern_keeper_portrait.webp',
  'unknown': 'unknown_portrait.webp',
  // Enemy combatant portraits
  'dock_thug': 'enemy_dock_thug.webp',
  'keldriss_smuggler': 'enemy_keldriss_smuggler.webp',
  'kolmari_enforcer': 'enemy_kolmari_enforcer.webp',
  'wardenscale': 'enemy_wardenscale.webp',
  'wardensea_officer_enemy': 'enemy_wardensea_officer.webp',
  'wardensea_soldier': 'enemy_wardensea_soldier.webp',
};

// Crew flag design images
export const flagImages: Record<string, string> = {
  'crossed_horns': 'flag_crossed_horns.webp',
  'dragon_anchor': 'flag_dragon_anchor.webp',
  'spike_wave': 'flag_spike_wave.webp',
};

/**
 * Get crew flag image path or null
 */
export function getFlagImage(flagDesign: string): string | null {
  const filename = flagImages[flagDesign];
  if (!filename) return null;
  return getImagePath(filename);
}

// Speaker to character ID mapping (for story dialogues)
export const speakerToCharacter: Record<string, string> = {
  'Karyudon': 'karyudon',
  'Delvessa': 'delvessa',
  'Delvessa Ghal': 'delvessa',
  'Dragghen': 'dragghen',
  'Dragghen Kolve': 'dragghen',
  'Suulen': 'suulen',
  'Suulen Vassere': 'suulen',
  'Kovesse': 'kovesse',
  'Kovesse Grenn': 'kovesse',
  'Tessek': 'tessek',
  'Tessek Vayne': 'tessek',
  'Orren': 'orren',
  'Orren Mahk': 'orren',
  'Vorreth': 'vorreth',
  'Vorreth Daaz': 'vorreth',
  'Pettha': 'pettha_koss',
  'Pettha Koss': 'pettha_koss',
  'Tessurren': 'tessurren',
  'Tessurren Dolch': 'tessurren',
  'Hella': 'hella',
  'Rukessa': 'rukessa',
  'Iren': 'iren_saltz',
  'Iren Saltz': 'iren_saltz',
  'Drezh': 'captain_drezh',
  'Captain Drezh': 'captain_drezh',
  'Maavi': 'maavi',
  'Maren': 'maren',
  'Tessavarra': 'tessavarra',
  'Vasshen': 'vasshen',
  // Rival
  'Sable': 'sable_venn',
  'Sable Venn': 'sable_venn',
  'Rikkart': 'rikkart',
  'Rikkart Bolm': 'rikkart',
  // Island Villains
  'Kellan': 'kellan_gyre',
  'Kellan Gyre': 'kellan_gyre',
  'Moth': 'moth_calaveras',
  'Moth Calaveras': 'moth_calaveras',
  'Brother Ossian': 'brother_ossian',
  'Ossian': 'brother_ossian',
  'Merrik': 'merrik_sevaine',
  'Merrik Sevaine': 'merrik_sevaine',
  'Maren Kade': 'maren_kade',
  'Hull': 'captain_hull',
  'Captain Hull': 'captain_hull',
  'Forge-Mother Tessik': 'forge_mother_tessik',
  'Tessik': 'forge_mother_tessik',
  'The Orchid': 'the_orchid',
  'Vessel Ahn': 'vessel_ahn',
  'Echo': 'echo_salis',
  'Echo Salis': 'echo_salis',
  // Kirin Arc
  'kirin': 'kirin_akkan',
  'Kirin': 'kirin_akkan',
  'Kirin Akkan': 'kirin_akkan',
  'kirin_akkan': 'kirin_akkan',
  // Wardensea Prime
  'khoss': 'prime_khoss',
  'Khoss': 'prime_khoss',
  'Edara Khoss': 'prime_khoss',
  'Prime Khoss': 'prime_khoss',
  'prime_khoss': 'prime_khoss',
};

// ==========================================
// UI CHROME ASSETS
// ==========================================

/** UI chrome image mappings - card frames, textures, ornaments, etc. */
export const uiAssets = {
  card_frame: 'ui/card_frame.webp',
  card_frame_active: 'ui/card_frame_active.webp',
  card_frame_combat: 'ui/card_frame_combat.webp',
  nameplate: 'ui/nameplate.webp',
  dialogue_frame: 'ui/dialogue_frame.webp',
  dialogue_box_frame: 'ui/dialogue_box_frame.webp',
  corner_ornament: 'ui/corner_ornament.webp',
  divider: 'ui/divider.webp',
  border_strips: 'ui/border_strips.webp',
  compass_rose: 'ui/compass_rose.webp',
  compass_ring: 'ui/compass_ring.webp',
  combat_hex_frame: 'ui/combat_hex_frame.webp',
  // Panel texture slots (graceful null fallback when files not present)
  panel_texture_story: 'ui/texture_parchment.webp',
  panel_texture_combat: 'ui/texture_iron.webp',
  panel_texture_management: 'ui/texture_wood.webp',
} as const;

/**
 * Get a UI chrome asset image path by key, or null if missing.
 * Falls back gracefully - all UI enhancements work without images.
 */
export function getUiAsset(key: keyof typeof uiAssets): string | null {
  return getImagePath(uiAssets[key]);
}

// Image cache to avoid repeated require() calls for successful loads
const imageCache: Record<string, string> = {};
const failedImages: Set<string> = new Set();

/**
 * Try to load an image from assets/images-webp/. Returns the image path if
 * the image exists, or null if it hasn't been added yet.
 * Uses an in-memory cache to track which images have been checked.
 */
export function getImagePath(filename: string): string | null {
  if (imageCache[filename]) return imageCache[filename];
  if (failedImages.has(filename)) return null;

  try {
    // In CRA, require() with a variable needs the base path to be static
    // We use a try/catch approach to gracefully handle missing images
    const path = require(`../assets/images-webp/${filename}`);
    imageCache[filename] = path;
    return path;
  } catch {
    failedImages.add(filename);
    return null;
  }
}

/**
 * Get character portrait path or null.
 * For Karyudon, pass a variant key ('karyudon_captain' or 'karyudon_hybrid')
 * to get the Act 2 captain or dragon fruit hybrid portrait.
 */
export function getPortrait(characterId: string): string | null {
  const filename = characterPortraits[characterId];
  if (!filename) return null;
  return getImagePath(filename);
}

// ==========================================
// EXPRESSION PORTRAITS
// ==========================================

export type CharacterExpression =
  | 'default' | 'angry' | 'grim' | 'happy' | 'satisfaction'
  | 'shock' | 'fear' | 'awe' | 'asleep';

/** Characters that have expression portrait assets.
 * NOTE: 'dragghen' removed — expression files contain wrong character (Vorreth's face).
 * Re-add dragghen once correct Gorundai shipwright expression images are generated. */
const EXPRESSION_CHARACTERS = new Set([
  'orren', 'tessek', 'suulen', 'delvessa', 'kovesse',
]);

// Cache for expression image paths (avoid repeated require() failures)
const expressionCache: Record<string, string | null> = {};

/**
 * Get a character portrait with a specific expression.
 * Falls back to the default portrait if expression asset is missing.
 */
export function getExpressionPortrait(
  characterId: string,
  expression?: CharacterExpression | string,
): string | null {
  // No expression or 'default' -> use normal portrait
  if (!expression || expression === 'default') return getPortrait(characterId);
  // Character has no expression assets -> normal portrait
  if (!EXPRESSION_CHARACTERS.has(characterId)) return getPortrait(characterId);

  const cacheKey = `${characterId}_${expression}`;
  if (cacheKey in expressionCache) {
    return expressionCache[cacheKey] || getPortrait(characterId);
  }

  // Try loading expression image from assets/images-webp/expressions/
  try {
    const path = require(`../assets/images-webp/expressions/${characterId}_${expression}.webp`);
    expressionCache[cacheKey] = path;
    return path;
  } catch {
    expressionCache[cacheKey] = null;
    return getPortrait(characterId);
  }
}

/**
 * Get the correct Karyudon portrait based on game phase and dragon fruit status.
 */
export function getKaryudonPortrait(gamePhase: string, dragonFruitEaten: boolean): string | null {
  if (dragonFruitEaten) return getPortrait('karyudon_hybrid');
  if (gamePhase === 'act2' || gamePhase === 'act3' || gamePhase === 'endgame') {
    return getPortrait('karyudon_captain');
  }
  return getPortrait('karyudon');
}

/**
 * Get scene background path or null
 */
export function getSceneBackground(beatId: string): string | null {
  const filename = sceneBackgrounds[beatId];
  if (!filename) return null;
  return getImagePath(filename);
}

// Combat background mappings (enemy type or encounter context -> image)
export const combatBackgrounds: Record<string, string> = {
  'wardensea': 'combat_wardensea_duel.webp',
  'wardensea_officer': 'combat_wardensea_duel.webp',
  'wardensea_soldier': 'combat_wardensea_duel.webp',
  'wardenscale': 'combat_wardensea_duel.webp',
  'kolmari_enforcer': 'combat_wardensea_duel.webp',
  'default': 'combat_bg_default.webp',
  'kings_pressure': 'combat_kings_pressure.webp',
  'delvessa_spar': 'combat_delvessa_spar.webp',
  // Coppervein encounters
  'coppervein_dispute': 'combat_coppervein_hall.webp',
  'gorundai_miner': 'combat_coppervein_hall.webp',
  'gorundai_foreman': 'combat_coppervein_hall.webp',
  'copperhand_officer': 'combat_coppervein_hall.webp',
  // Keldriss shadow market encounters
  'keldriss_smuggler': 'combat_shadow_market.webp',
  'keldriss_cutthroat': 'combat_shadow_market.webp',
  'keldriss_ambush': 'combat_shadow_market.webp',
  // Kirin boss fight (uses iron unleash as backdrop)
  'kirin_akkan': 'combat_iron_unleash.webp',
  'kirin': 'combat_iron_unleash.webp',
  // Prime Khoss boss fight (uses wardensea duel backdrop)
  'prime_khoss': 'combat_wardensea_duel.webp',
};

/**
 * Get combat background for an enemy type or encounter context
 */
export function getCombatBackground(enemyId?: string): string | null {
  if (enemyId && combatBackgrounds[enemyId]) {
    return getImagePath(combatBackgrounds[enemyId]);
  }
  return getImagePath(combatBackgrounds['default']);
}

// ==========================================
// GAME ICON ASSETS
// ==========================================

/** Icon image mappings for resources, stats, combat effects, and abilities */
export const gameIcons: Record<string, string> = {
  // Resources
  'sovereignty': 'icon_sovereignty.webp',
  'supplies': 'icon_supplies.webp',
  'materials': 'icon_materials.webp',
  'intelligence': 'icon_intelligence.webp',
  'potion': 'icon_potion.webp',

  // Dominion stats
  'iron': 'icon_iron.webp',
  'sight': 'icon_sight.webp',
  'king': 'icon_king.webp',
  'dragon_eye': 'icon_dragon_eye.webp',

  // Combat effects
  'bleed': 'icon_bleed.webp',
  'shield': 'icon_shield.webp',
  'dodge': 'icon_dodge.webp',
  'heal': 'icon_heal.webp',
  'expose': 'icon_expose.webp',
  'thunder': 'icon_thunder.webp',
  'precision': 'icon_precision.webp',

  // Combat stance / defense
  'iron_attack': 'icon_iron_attack.webp',
  'iron_defense': 'icon_iron_defense.webp',
  'sight_defense': 'icon_sight_defense.webp',

  // Weapons
  'weapon_basic': 'icon_weapon_basic.webp',
  'weapon_upgraded': 'icon_weapon_upgraded.webp',

  // Combat action categories
  'combat_attack': 'icon_combat_attack.webp',
  'combat_defend': 'icon_combat_defend.webp',
  'combat_crew': 'icon_combat_crew.webp',

  // Alternative style icons
  'iron_fist': 'icon_iron_fist.webp',
  'shield_energy': 'icon_shield_energy.webp',
  'crew_ghost': 'icon_crew_ghost.webp',
};

/**
 * Get a game icon image path by key, or null if missing
 */
export function getIconPath(iconKey: string): string | null {
  const filename = gameIcons[iconKey];
  if (!filename) return null;
  return getImagePath(filename);
}
