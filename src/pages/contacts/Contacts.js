import React from 'react';
import './contacts.scss'
import StarIcon from '@material-ui/icons/Star';
import VisibilityIcon from '@material-ui/icons/Visibility';
import ForumIcon from '@material-ui/icons/Forum';
import ShareIcon from '@material-ui/icons/Share';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import PrintIcon from '@material-ui/icons/Print';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import VoiceChatIcon from '@material-ui/icons/VoiceChat';

export default function Contacts() {
  return <div className="container-fluid">
    <div className="block-header">
      <div className="row">
        <div className="col-9">
          {/* Contact breadcrumb*/}
          <ul className="breadcrumb breadcrumb-style ">
            <li className="breadcrumb-item">
              <h4 className="page-title">Contacts</h4>
            </li>
            <li className="breadcrumb-item bcrumb-1">
              <a routerLink="/contact/contacts/new">
                <i className="fas fa-plus"></i> New</a>
            </li>
          </ul>

        </div>
        {/* Search Input column */}
        <div className="col-3">
          <input type="text" className="my-3 form-control" placeholder="Search ......" />
        </div>
      </div>

    </div>
    <div className="row clearfix">
      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <div className="card">
          <div className="body">
            {/* 01. Row One Section */}
            <div className="row">
              <div className="col-12">
                <div className="card p-3">
                  <div className="row">
                    {/*  Row One Card One */}
                    <div className="col-12 col-md-2 mb-0 img-center">
                      <div>
                        <div className='icons-container stars d-flex flex-row justify-content-end'>
                          <Tooltip title="Star">
                            <IconButton arai-label="Star">
                              <StarIcon className="col-orange" />
                            </IconButton>
                          </Tooltip>
                        </div>
                        <img className="img-circle doc-card-image" style={{ width: "100px" }} src="https://picsum.photos/206" />
                        <div className="doc-card-title pt-2">
                          <h4 style={{ color: '#00bdf2' }}>Dr. Sarah Smith</h4>
                        </div>
                      </div>
                    </div>
                    {/*  Row One Card Two */}
                    <div className="col-md-4 border-right mb-0">
                      {/* Card Description */}
                      <div className="description">
                        <div><i className="fas fa-map-marker-alt pt-3 psr-3"></i> Shanti Nagar Bldg No B 4, Sector No 6,
                          Mira
                          Road</div>
                        <div><i className="far fa-comment-dots pt-3 psr-3"></i> 234 Feedback </div>
                        <div><i className="far fa-money-bill-alt pt-3 psr-3"></i> INR 500 </div>
                        <div><i className="far fa-clock pt-3 psr-3 pb-3"></i> MON - SAT 10:00 AM - 8:00PM</div>
                      </div>

                      {/* 01. Card Button Icons section */}
                      <div className='contact-icons-container'>
                        {/* Hide tool tip section */}
                        <Tooltip title="View Profile of Contact" arrow>
                          <IconButton className="icon-btn-margin" aria-label="Make visible">
                            <VisibilityIcon className="visibility-icon" />
                          </IconButton>
                        </Tooltip>
                        {/* Delete tool tip section */}
                        <Tooltip title="Delete contact" arrow>
                          <IconButton className="icon-btn-margin" aria-label="Delete">
                            <DeleteIcon className="delete-icon" />
                          </IconButton>
                        </Tooltip>
                        {/* Chat tool tip section */}
                        <Tooltip title="Chat contact" arrow>
                          <IconButton className="icon-btn-margin">
                            <ForumIcon className="forum-icon" />
                          </IconButton>
                        </Tooltip>
                        {/* Share tool tip section */}
                        <Tooltip title="Share contact" arrow>
                          <IconButton className="icon-btn-margin">
                            <ShareIcon className="share-icon" />
                          </IconButton>
                        </Tooltip>
                        {/* PDF tool tip section */}
                        <Tooltip title="Pdf of contact" arrow>
                          <IconButton className="icon-btn-margin">
                            <PictureAsPdfIcon className="picture-as-pdf-icon" />
                          </IconButton>
                        </Tooltip>
                        {/* Print tool tip section */}
                        <Tooltip title="Print contact" arrow>
                          <IconButton className="icon-btn-margin">
                            <PrintIcon className="print-icon" />
                          </IconButton>
                        </Tooltip>
                        {/* Storage tool tip section */}
                        <Tooltip title="Video Call" arrow>
                          <IconButton className="icon-btn-margin">
                            <VoiceChatIcon className="voice-icon" />
                          </IconButton>
                        </Tooltip>
                      </div>
                    </div>
                    <div className="d-flex col-md-6 mb-0">
                      <div className="d-flex flex-column justify-content-start user-profile w-100">
                        <div className="row">
                          {/* Row One Card Three */}
                          <div className="col-12 col-md-4 mb-0 img-center d-flex flex-column justify-content-center">
                            {/* Card Avatar and Star Icon*/}
                            <div>
                              <div className='icons-container stars d-flex flex-row justify-content-end'>
                                <Tooltip title="Star">
                                  <IconButton arai-label="Star">
                                    <StarIcon className="col-orange" />
                                  </IconButton>
                                </Tooltip>
                              </div>
                              <img className="img-circle doc-card-image" style={{ width: "100px" }} src="https://picsum.photos/205" />
                            </div>
                            {/* Card title */}
                            <div className="doc-card-title pt-2">
                              <h4 style={{ color: '#00bdf2' }}>Dr. Sarah Smith</h4>
                            </div>
                          </div>
                          {/* Row One Card Four */}
                          <div className="col-md-8 mb-0">
                            {/* Card description */}
                            <div className="description">
                              <div><i className="fas fa-map-marker-alt pt-3 psr-3"></i> Shanti Nagar Bldg No B 4, Sector No 6,
                                Mira
                                Road</div>
                              <div><i className="far fa-comment-dots pt-3 psr-3"></i> 234 Feedback </div>
                              <div><i className="far fa-money-bill-alt pt-3 psr-3"></i> INR 500 </div>
                              <div><i className="far fa-clock pt-3 psr-3 pb-3"></i> MON - SAT 10:00 AM - 8:00PM</div>
                            </div>

                            {/* 02. Card Button Icons section */}
                            <div className='contact-icons-container'>
                              {/* Hide tool tip section */}
                              <Tooltip title="View Profile of Contact" arrow>
                                <IconButton className="icon-btn-margin" aria-label="Make visible">
                                  <VisibilityIcon className="visibility-icon" />
                                </IconButton>
                              </Tooltip>
                              {/* Delete tool tip section */}
                              <Tooltip title="Delete contact" arrow>
                                <IconButton className="icon-btn-margin" aria-label="Delete">
                                  <DeleteIcon className="delete-icon" />
                                </IconButton>
                              </Tooltip>
                              {/* Chat tool tip section */}
                              <Tooltip title="Chat contact" arrow>
                                <IconButton className="icon-btn-margin">
                                  <ForumIcon className="forum-icon" />
                                </IconButton>
                              </Tooltip>
                              {/* Share tool tip section */}
                              <Tooltip title="Share contact" arrow>
                                <IconButton className="icon-btn-margin">
                                  <ShareIcon className="share-icon" />
                                </IconButton>
                              </Tooltip>
                              {/* PDF tool tip section */}
                              <Tooltip title="Pdf of contact" arrow>
                                <IconButton className="icon-btn-margin">
                                  <PictureAsPdfIcon className="picture-as-pdf-icon" />
                                </IconButton>
                              </Tooltip>
                              {/* Print tool tip section */}
                              <Tooltip title="Print contact" arrow>
                                <IconButton className="icon-btn-margin">
                                  <PrintIcon className="print-icon" />
                                </IconButton>
                              </Tooltip>
                              {/* Storage tool tip section */}
                              <Tooltip title="Video Call" arrow>
                                <IconButton className="icon-btn-margin">
                                  <VoiceChatIcon className="voice-icon" />
                                </IconButton>
                              </Tooltip>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 02. Row Two Section */}
            <div className="row">
              <div className="col-12">
                <div className="card p-3">
                  <div className="row">
                    {/* Row Two Card One*/}
                    <div className="col-12 col-md-2 mb-0 img-center">
                      <div>
                        <div className='icons-container stars d-flex flex-row justify-content-end'>
                          <Tooltip title="Star">
                            <IconButton arai-label="Star">
                              <StarIcon className="col-orange" />
                            </IconButton>
                          </Tooltip>
                        </div>
                        <img className="img-circle doc-card-image" style={{ width: "100px" }} src="https://picsum.photos/204" />
                        {/* Card title section */}
                        <div className="doc-card-title pt-2">
                          <h4 style={{ color: '#00bdf2' }}>Dr. Sarah Smith</h4>
                        </div>
                      </div>
                    </div>
                    {/* Row Two Card Two */}
                    <div className="col-md-4 border-right mb-0">
                      {/* Card description */}
                      <div className="description">
                        <div>
                          <i className="fas fa-map-marker-alt pt-3 psr-3"></i> Shanti Nagar Bldg No B 4, Sector No 6,
                          Mira
                          Road
                        </div>
                        <div><i className="far fa-comment-dots pt-3 psr-3"></i> 176 Feedback </div>
                        <div><i className="far fa-money-bill-alt pt-3 psr-3"></i> INR 300 </div>
                        <div><i className="far fa-clock pt-3 psr-3 pb-3"></i> MON - SAT 10:00 AM - 8:00PM</div>
                      </div>

                      {/* 03. Card Button Icons section */}
                      <div className='contact-icons-container'>
                        {/* Hide tool tip section */}
                        <Tooltip title="View Profile of Contact" arrow>
                          <IconButton className="icon-btn-margin" aria-label="Make visible">
                            <VisibilityIcon className="visibility-icon" />
                          </IconButton>
                        </Tooltip>
                        {/* Delete tool tip section */}
                        <Tooltip title="Delete contact" arrow>
                          <IconButton className="icon-btn-margin" aria-label="Delete">
                            <DeleteIcon className="delete-icon" />
                          </IconButton>
                        </Tooltip>
                        {/* Chat tool tip section */}
                        <Tooltip title="Chat contact" arrow>
                          <IconButton className="icon-btn-margin">
                            <ForumIcon className="forum-icon" />
                          </IconButton>
                        </Tooltip>
                        {/* Share tool tip section */}
                        <Tooltip title="Share contact" arrow>
                          <IconButton className="icon-btn-margin">
                            <ShareIcon className="share-icon" />
                          </IconButton>
                        </Tooltip>
                        {/* PDF tool tip section */}
                        <Tooltip title="Pdf of contact" arrow>
                          <IconButton className="icon-btn-margin">
                            <PictureAsPdfIcon className="picture-as-pdf-icon" />
                          </IconButton>
                        </Tooltip>
                        {/* Print tool tip section */}
                        <Tooltip title="Print contact" arrow>
                          <IconButton className="icon-btn-margin">
                            <PrintIcon className="print-icon" />
                          </IconButton>
                        </Tooltip>
                        {/* Storage tool tip section */}
                        <Tooltip title="Video Call" arrow>
                          <IconButton className="icon-btn-margin">
                            <VoiceChatIcon className="voice-icon" />
                          </IconButton>
                        </Tooltip>
                      </div>
                    </div>

                    <div className="d-flex col-md-6 mb-0">
                      <div className="d-flex flex-column justify-content-start user-profile w-100">
                        <div className="row">
                          {/* Row Two Card Three */}
                          <div className="col-12 col-md-4 mb-0 img-center d-flex flex-column justify-content-center">
                            {/* Card Avatar and star Icon */}
                            <div>
                              <div className='icons-container stars d-flex flex-row justify-content-end'>
                                <Tooltip title="Star">
                                  <IconButton arai-label="Star">
                                    <StarIcon className="col-orange" />
                                  </IconButton>
                                </Tooltip>
                              </div>
                              <img className="img-circle doc-card-image" style={{ width: "100px" }} src="https://picsum.photos/203" />
                            </div>
                            {/* Card Title */}
                            <div className="doc-card-title pt-2">
                              <h4 style={{ color: '#00bdf2' }}>Dr. Sarah Smith</h4>
                            </div>
                          </div>
                          {/* 4. Row Two Card Four */}
                          <div className="col-md-8 mb-0">
                            {/* Card Description */}
                            <div className="description">
                              <div><i className="fas fa-map-marker-alt pt-3 psr-3"></i> Shanti Nagar Bldg No B 4, Sector No 6,
                                Mira
                                Road</div>
                              <div><i className="far fa-comment-dots pt-3 psr-3"></i> 659 Feedback </div>
                              <div><i className="far fa-money-bill-alt pt-3 psr-3"></i> INR 600 </div>
                              <div><i className="far fa-clock pt-3 psr-3 pb-3"></i> MON - SAT 10:00 AM - 8:00PM</div>
                            </div>
                            {/* 04. Card Button Icons section */}
                            <div className='contact-icons-container'>
                              {/* Hide tool tip section */}
                              <Tooltip title="View Profile of Contact" arrow>
                                <IconButton className="icon-btn-margin" aria-label="Make visible">
                                  <VisibilityIcon className="visibility-icon" />
                                </IconButton>
                              </Tooltip>
                              {/* Delete tool tip section */}
                              <Tooltip title="Delete contact" arrow>
                                <IconButton className="icon-btn-margin" aria-label="Delete">
                                  <DeleteIcon className="delete-icon" />
                                </IconButton>
                              </Tooltip>
                              {/* Chat tool tip section */}
                              <Tooltip title="Chat contact" arrow>
                                <IconButton className="icon-btn-margin">
                                  <ForumIcon className="forum-icon" />
                                </IconButton>
                              </Tooltip>
                              {/* Share tool tip section */}
                              <Tooltip title="Share contact" arrow>
                                <IconButton className="icon-btn-margin">
                                  <ShareIcon className="share-icon" />
                                </IconButton>
                              </Tooltip>
                              {/* PDF tool tip section */}
                              <Tooltip title="Pdf of contact" arrow>
                                <IconButton className="icon-btn-margin">
                                  <PictureAsPdfIcon className="picture-as-pdf-icon" />
                                </IconButton>
                              </Tooltip>
                              {/* Print tool tip section */}
                              <Tooltip title="Print contact" arrow>
                                <IconButton className="icon-btn-margin">
                                  <PrintIcon className="print-icon" />
                                </IconButton>
                              </Tooltip>
                              {/* Storage tool tip section */}
                              <Tooltip title="Video Call" arrow>
                                <IconButton className="icon-btn-margin">
                                  <VoiceChatIcon className="voice-icon" />
                                </IconButton>
                              </Tooltip>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 03. Row Three Section */}
            <div className="row">
              <div className="col-12">
                <div className="card p-3">
                  <div className="row">
                    {/* Row Three Card One*/}
                    <div className="col-12 col-md-2 mb-0 img-center">
                      <div>
                        {/* Card Avatar and Star Icon */}
                        <div className='icons-container stars d-flex flex-row justify-content-end'>
                          <Tooltip title="Star">
                            <IconButton arai-label="Star">
                              <StarIcon className="col-orange" />
                            </IconButton>
                          </Tooltip>
                        </div>
                        <img className="img-circle doc-card-image" style={{ width: "100px" }} src="https://picsum.photos/202" />
                        {/* Card Title */}
                        <div className="doc-card-title pt-2">
                          <h4 style={{ color: '#00bdf2' }}>Dr. Sarah Smith</h4>
                        </div>
                      </div>
                    </div>
                    {/* Row Three Card Two*/}
                    <div className="col-md-4 border-right mb-0">
                      {/* Card Description */}
                      <div className="description">
                        <div><i className="fas fa-map-marker-alt pt-3 psr-3"></i> Shanti Nagar Bldg No B 4, Sector No 6,
                          Mira
                          Road</div>
                        <div><i className="far fa-comment-dots pt-3 psr-3"></i> 234 Feedback </div>
                        <div><i className="far fa-money-bill-alt pt-3 psr-3"></i> INR 500 </div>
                        <div><i className="far fa-clock pt-3 psr-3 pb-3"></i> MON - SAT 10:00 AM - 8:00PM</div>
                      </div>
                      {/* 05. Card Button Icons section */}
                      <div className='contact-icons-container'>
                        {/* Hide tool tip section */}
                        <Tooltip title="View Profile of Contact" arrow>
                          <IconButton className="icon-btn-margin" aria-label="Make visible">
                            <VisibilityIcon className="visibility-icon" />
                          </IconButton>
                        </Tooltip>
                        {/* Delete tool tip section */}
                        <Tooltip title="Delete contact" arrow>
                          <IconButton className="icon-btn-margin" aria-label="Delete">
                            <DeleteIcon className="delete-icon" />
                          </IconButton>
                        </Tooltip>
                        {/* Chat tool tip section */}
                        <Tooltip title="Chat contact" arrow>
                          <IconButton className="icon-btn-margin">
                            <ForumIcon className="forum-icon" />
                          </IconButton>
                        </Tooltip>
                        {/* Share tool tip section */}
                        <Tooltip title="Share contact" arrow>
                          <IconButton className="icon-btn-margin">
                            <ShareIcon className="share-icon" />
                          </IconButton>
                        </Tooltip>
                        {/* PDF tool tip section */}
                        <Tooltip title="Pdf of contact" arrow>
                          <IconButton className="icon-btn-margin">
                            <PictureAsPdfIcon className="picture-as-pdf-icon" />
                          </IconButton>
                        </Tooltip>
                        {/* Print tool tip section */}
                        <Tooltip title="Print contact" arrow>
                          <IconButton className="icon-btn-margin">
                            <PrintIcon className="print-icon" />
                          </IconButton>
                        </Tooltip>
                        {/* Storage tool tip section */}
                        <Tooltip title="Video Call" arrow>
                          <IconButton className="icon-btn-margin">
                            <VoiceChatIcon className="voice-icon" />
                          </IconButton>
                        </Tooltip>
                      </div>
                    </div>

                    <div className="d-flex col-md-6 mb-0">
                      <div className="d-flex flex-column justify-content-start user-profile w-100">
                        <div className="row">
                          {/* Row Three Card Three*/}
                          <div className="col-12 col-md-4 mb-0 img-center d-flex flex-column justify-content-center">
                            {/* Card Avatar and star icon */}
                            <div>
                              <div className='icons-container stars d-flex flex-row justify-content-end'>
                                <Tooltip title="Star">
                                  <IconButton arai-label="Star">
                                    <StarIcon className="col-orange" />
                                  </IconButton>
                                </Tooltip>
                              </div>
                              <img className="img-circle doc-card-image" style={{ width: "100px" }} src="https://picsum.photos/201" />
                            </div>
                            {/* Card Title */}
                            <div className="doc-card-title pt-2">
                              <h4 style={{ color: '#00bdf2' }}>Dr. Sarah Smith</h4>
                            </div>
                          </div>
                          {/* Row Three Card Four*/}
                          <div className="col-md-8 mb-0">
                            <div className="description">
                              <div><i className="fas fa-map-marker-alt pt-3 psr-3"></i> Shanti Nagar Bldg No B 4, Sector No 6,
                                Mira
                                Road</div>
                              <div><i className="far fa-comment-dots pt-3 psr-3"></i> 234 Feedback </div>
                              <div><i className="far fa-money-bill-alt pt-3 psr-3"></i> INR 500 </div>
                              <div><i className="far fa-clock pt-3 psr-3 pb-3"></i> MON - SAT 10:00 AM - 8:00PM</div>
                            </div>
                            {/* 06. Card Button Icons section */}
                            <div className='contact-icons-container'>
                              {/* Hide tool tip section */}
                              <Tooltip title="View Profile of Contact" arrow>
                                <IconButton className="icon-btn-margin" aria-label="Make visible">
                                  <VisibilityIcon className="visibility-icon" />
                                </IconButton>
                              </Tooltip>
                              {/* Delete tool tip section */}
                              <Tooltip title="Delete contact" arrow>
                                <IconButton className="icon-btn-margin" aria-label="Delete">
                                  <DeleteIcon className="delete-icon" />
                                </IconButton>
                              </Tooltip>
                              {/* Chat tool tip section */}
                              <Tooltip title="Chat contact" arrow>
                                <IconButton className="icon-btn-margin">
                                  <ForumIcon className="forum-icon" />
                                </IconButton>
                              </Tooltip>
                              {/* Share tool tip section */}
                              <Tooltip title="Share contact" arrow>
                                <IconButton className="icon-btn-margin">
                                  <ShareIcon className="share-icon" />
                                </IconButton>
                              </Tooltip>
                              {/* PDF tool tip section */}
                              <Tooltip title="Pdf of contact" arrow>
                                <IconButton className="icon-btn-margin">
                                  <PictureAsPdfIcon className="picture-as-pdf-icon" />
                                </IconButton>
                              </Tooltip>
                              {/* Print tool tip section */}
                              <Tooltip title="Print contact" arrow>
                                <IconButton className="icon-btn-margin">
                                  <PrintIcon className="print-icon" />
                                </IconButton>
                              </Tooltip>
                              {/* Storage tool tip section */}
                              <Tooltip title="Video Call" arrow>
                                <IconButton className="icon-btn-margin">
                                  <VoiceChatIcon className="voice-icon" />
                                </IconButton>
                              </Tooltip>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 04. Row Four Section */}
            <div className="row">
              <div className="col-12">
                <div className="card p-3">
                  <div className="row">
                    {/* Row Four Card One */}
                    <div className="col-12 col-md-2 mb-0 img-center">
                      {/* Card Avatar and Star Icon */}
                      <div>
                        <div className='icons-container stars d-flex flex-row justify-content-end'>
                          <Tooltip title="Star">
                            <IconButton arai-label="Star">
                              <StarIcon className="col-orange" />
                            </IconButton>
                          </Tooltip>
                        </div>
                        <img className="img-circle doc-card-image" style={{ width: "100px" }} src="https://picsum.photos/206" />
                        {/* Card Title */}
                        <div className="doc-card-title pt-2">
                          <h4 style={{ color: '#00bdf2' }}>Dr. Sarah Smith</h4>
                        </div>
                      </div>
                    </div>

                    {/* Row Four Card Two */}
                    <div className="col-md-4 border-right mb-0">
                      {/* Card description */}
                      <div className="description">
                        <div><i className="fas fa-map-marker-alt pt-3 psr-3"></i> Shanti Nagar Bldg No B 4, Sector No 6,
                          Mira
                          Road</div>
                        <div><i className="far fa-comment-dots pt-3 psr-3"></i> 234 Feedback </div>
                        <div><i className="far fa-money-bill-alt pt-3 psr-3"></i> INR 500 </div>
                        <div><i className="far fa-clock pt-3 psr-3 pb-3"></i> MON - SAT 10:00 AM - 8:00PM</div>
                      </div>
                      {/* 07. Card Button Icons section */}
                      <div className='contact-icons-container'>
                        {/* Hide tool tip section */}
                        <Tooltip title="View Profile of Contact" arrow>
                          <IconButton className="icon-btn-margin" aria-label="Make visible">
                            <VisibilityIcon className="visibility-icon" />
                          </IconButton>
                        </Tooltip>
                        {/* Delete tool tip section */}
                        <Tooltip title="Delete contact" arrow>
                          <IconButton className="icon-btn-margin" aria-label="Delete">
                            <DeleteIcon className="delete-icon" />
                          </IconButton>
                        </Tooltip>
                        {/* Chat tool tip section */}
                        <Tooltip title="Chat contact" arrow>
                          <IconButton className="icon-btn-margin">
                            <ForumIcon className="forum-icon" />
                          </IconButton>
                        </Tooltip>
                        {/* Share tool tip section */}
                        <Tooltip title="Share contact" arrow>
                          <IconButton className="icon-btn-margin">
                            <ShareIcon className="share-icon" />
                          </IconButton>
                        </Tooltip>
                        {/* PDF tool tip section */}
                        <Tooltip title="Pdf of contact" arrow>
                          <IconButton className="icon-btn-margin">
                            <PictureAsPdfIcon className="picture-as-pdf-icon" />
                          </IconButton>
                        </Tooltip>
                        {/* Print tool tip section */}
                        <Tooltip title="Print contact" arrow>
                          <IconButton className="icon-btn-margin">
                            <PrintIcon className="print-icon" />
                          </IconButton>
                        </Tooltip>
                        {/* Storage tool tip section */}
                        <Tooltip title="Video Call" arrow>
                          <IconButton className="icon-btn-margin">
                            <VoiceChatIcon className="voice-icon" />
                          </IconButton>
                        </Tooltip>
                      </div>
                    </div>

                    <div className="d-flex col-md-6 mb-0">
                      <div className="d-flex flex-column justify-content-start user-profile w-100">
                        <div className="row">
                          {/* Row Four Card Three */}
                          <div className="col-12 col-md-4 mb-0 img-center d-flex flex-column justify-content-center">
                            {/* Card Avatar and star Icon*/}
                            <div>
                              <div className='icons-container stars d-flex flex-row justify-content-end'>
                                <Tooltip title="Star">
                                  <IconButton arai-label="Star">
                                    <StarIcon className="col-orange" />
                                  </IconButton>
                                </Tooltip>
                              </div>
                              <img className="img-circle doc-card-image" style={{ width: "100px" }} src="https://picsum.photos/205" />
                            </div>
                            {/* Card Title */}
                            <div className="doc-card-title pt-2">
                              <h4 style={{ color: '#00bdf2' }}>Dr. Sarah Smith</h4>
                            </div>
                          </div>
                          {/* Row Four Card Four */}
                          <div className="col-md-8 mb-0">
                            {/* Card description */}
                            <div className="description">
                              <div><i className="fas fa-map-marker-alt pt-3 psr-3"></i> Shanti Nagar Bldg No B 4, Sector No 6,
                                Mira
                                Road</div>
                              <div><i className="far fa-comment-dots pt-3 psr-3"></i> 234 Feedback </div>
                              <div><i className="far fa-money-bill-alt pt-3 psr-3"></i> INR 500 </div>
                              <div><i className="far fa-clock pt-3 psr-3 pb-3"></i> MON - SAT 10:00 AM - 8:00PM</div>
                            </div>

                            {/* 08. Card Button Icons section */}
                            <div className='contact-icons-container'>
                              {/* Hide tool tip section */}
                              <Tooltip title="View Profile of Contact" arrow>
                                <IconButton className="icon-btn-margin" aria-label="Make visible">
                                  <VisibilityIcon className="visibility-icon" />
                                </IconButton>
                              </Tooltip>
                              {/* Delete tool tip section */}
                              <Tooltip title="Delete contact" arrow>
                                <IconButton className="icon-btn-margin" aria-label="Delete">
                                  <DeleteIcon className="delete-icon" />
                                </IconButton>
                              </Tooltip>
                              {/* Chat tool tip section */}
                              <Tooltip title="Chat contact" arrow>
                                <IconButton className="icon-btn-margin">
                                  <ForumIcon className="forum-icon" />
                                </IconButton>
                              </Tooltip>
                              {/* Share tool tip section */}
                              <Tooltip title="Share contact" arrow>
                                <IconButton className="icon-btn-margin">
                                  <ShareIcon className="share-icon" />
                                </IconButton>
                              </Tooltip>
                              {/* PDF tool tip section */}
                              <Tooltip title="Pdf of contact" arrow>
                                <IconButton className="icon-btn-margin">
                                  <PictureAsPdfIcon className="picture-as-pdf-icon" />
                                </IconButton>
                              </Tooltip>
                              {/* Print tool tip section */}
                              <Tooltip title="Print contact" arrow>
                                <IconButton className="icon-btn-margin">
                                  <PrintIcon className="print-icon" />
                                </IconButton>
                              </Tooltip>
                              {/* Storage tool tip section */}
                              <Tooltip title="Video Call" arrow>
                                <IconButton className="icon-btn-margin">
                                  <VoiceChatIcon className="voice-icon" />
                                </IconButton>
                              </Tooltip>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 05. Row Five Section */}
            <div className="row">
              <div className="col-12">
                <div className="card p-3">
                  <div className="row">
                    {/* Row Five Card One */}
                    <div className="col-12 col-md-2 mb-0 img-center">
                      {/* Card Avatar and Star Icon*/}
                      <div>
                        <div className='icons-container stars d-flex flex-row justify-content-end'>
                          <Tooltip title="Star">
                            <IconButton arai-label="Star">
                              <StarIcon className="col-orange" />
                            </IconButton>
                          </Tooltip>
                        </div>
                        <img className="img-circle doc-card-image" style={{ width: "100px" }} src="https://picsum.photos/204" />
                        {/* Card Title */}
                        <div className="doc-card-title pt-2">
                          <h4 style={{ color: '#00bdf2' }}>Dr. Sarah Smith</h4>
                        </div>
                      </div>
                    </div>
                    {/* Row Five Card Two */}
                    <div className="col-md-4 border-right mb-0">
                      {/* Card description */}
                      <div className="description">
                        <div><i className="fas fa-map-marker-alt pt-3 psr-3"></i> Shanti Nagar Bldg No B 4, Sector No 6,
                          Mira
                          Road</div>
                        <div><i className="far fa-comment-dots pt-3 psr-3"></i> 234 Feedback </div>
                        <div><i className="far fa-money-bill-alt pt-3 psr-3"></i> INR 500 </div>
                        <div><i className="far fa-clock pt-3 psr-3 pb-3"></i> MON - SAT 10:00 AM - 8:00PM</div>
                      </div>

                      {/* 09. Card Button Icons section */}
                      <div className='contact-icons-container'>
                        {/* Hide tool tip section */}
                        <Tooltip title="View Profile of Contact" arrow>
                          <IconButton className="icon-btn-margin" aria-label="Make visible">
                            <VisibilityIcon className="visibility-icon" />
                          </IconButton>
                        </Tooltip>
                        {/* Delete tool tip section */}
                        <Tooltip title="Delete contact" arrow>
                          <IconButton className="icon-btn-margin" aria-label="Delete">
                            <DeleteIcon className="delete-icon" />
                          </IconButton>
                        </Tooltip>
                        {/* Chat tool tip section */}
                        <Tooltip title="Chat contact" arrow>
                          <IconButton className="icon-btn-margin">
                            <ForumIcon className="forum-icon" />
                          </IconButton>
                        </Tooltip>
                        {/* Share tool tip section */}
                        <Tooltip title="Share contact" arrow>
                          <IconButton className="icon-btn-margin">
                            <ShareIcon className="share-icon" />
                          </IconButton>
                        </Tooltip>
                        {/* PDF tool tip section */}
                        <Tooltip title="Pdf of contact" arrow>
                          <IconButton className="icon-btn-margin">
                            <PictureAsPdfIcon className="picture-as-pdf-icon" />
                          </IconButton>
                        </Tooltip>
                        {/* Print tool tip section */}
                        <Tooltip title="Print contact" arrow>
                          <IconButton className="icon-btn-margin">
                            <PrintIcon className="print-icon" />
                          </IconButton>
                        </Tooltip>
                        {/* Storage tool tip section */}
                        <Tooltip title="Video Call" arrow>
                          <IconButton className="icon-btn-margin">
                            <VoiceChatIcon className="voice-icon" />
                          </IconButton>
                        </Tooltip>
                      </div>
                    </div>

                    <div className="d-flex col-md-6 mb-0">
                      <div className="d-flex flex-column justify-content-start user-profile w-100">
                        <div className="row">
                          {/* Row Five Card Three */}
                          <div className="col-12 col-md-4 mb-0 img-center d-flex flex-column justify-content-center">
                            {/* Card Avatar and Star Icon*/}
                            <div>
                              <div className='icons-container stars d-flex flex-row justify-content-end'>
                                <Tooltip title="Star">
                                  <IconButton arai-label="Star">
                                    <StarIcon className="col-orange" />
                                  </IconButton>
                                </Tooltip>
                              </div>
                              <img className="img-circle doc-card-image" style={{ width: "100px" }} src="https://picsum.photos/203" />
                            </div>
                            {/* Card Title */}
                            <div className="doc-card-title pt-2">
                              <h4 style={{ color: '#00bdf2' }}>Dr. Sarah Smith</h4>
                            </div>
                          </div>

                          {/* Row Five Card Four */}
                          <div className="col-md-8 mb-0">
                            <div className="description">
                              <div><i className="fas fa-map-marker-alt pt-3 psr-3"></i> Shanti Nagar Bldg No B 4, Sector No 6,
                                Mira
                                Road</div>
                              <div><i className="far fa-comment-dots pt-3 psr-3"></i> 234 Feedback </div>
                              <div><i className="far fa-money-bill-alt pt-3 psr-3"></i> INR 500 </div>
                              <div><i className="far fa-clock pt-3 psr-3 pb-3"></i> MON - SAT 10:00 AM - 8:00PM</div>
                            </div>
                            {/* 10. Card Button Icons section */}
                            <div className='contact-icons-container'>
                              {/* Hide tool tip section */}
                              <Tooltip title="View Profile of Contact" arrow>
                                <IconButton className="icon-btn-margin" aria-label="Make visible">
                                  <VisibilityIcon className="visibility-icon" />
                                </IconButton>
                              </Tooltip>
                              {/* Delete tool tip section */}
                              <Tooltip title="Delete contact" arrow>
                                <IconButton className="icon-btn-margin" aria-label="Delete">
                                  <DeleteIcon className="delete-icon" />
                                </IconButton>
                              </Tooltip>
                              {/* Chat tool tip section */}
                              <Tooltip title="Chat contact" arrow>
                                <IconButton className="icon-btn-margin">
                                  <ForumIcon className="forum-icon" />
                                </IconButton>
                              </Tooltip>
                              {/* Share tool tip section */}
                              <Tooltip title="Share contact" arrow>
                                <IconButton className="icon-btn-margin">
                                  <ShareIcon className="share-icon" />
                                </IconButton>
                              </Tooltip>
                              {/* PDF tool tip section */}
                              <Tooltip title="Pdf of contact" arrow>
                                <IconButton className="icon-btn-margin">
                                  <PictureAsPdfIcon className="picture-as-pdf-icon" />
                                </IconButton>
                              </Tooltip>
                              {/* Print tool tip section */}
                              <Tooltip title="Print contact" arrow>
                                <IconButton className="icon-btn-margin">
                                  <PrintIcon className="print-icon" />
                                </IconButton>
                              </Tooltip>
                              {/* Storage tool tip section */}
                              <Tooltip title="Video Call" arrow>
                                <IconButton className="icon-btn-margin">
                                  <VoiceChatIcon className="voice-icon" />
                                </IconButton>
                              </Tooltip>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 06. Row Six Section */}
            <div className="row">
              <div className="col-12">
                <div className="card p-3">
                  <div className="row">
                    {/* Row Six Card One */}
                    <div className="col-12 col-md-2 mb-0 img-center">
                      {/* Card Avatar start icon */}
                      <div>
                        <div className='icons-container stars d-flex flex-row justify-content-end'>
                          <Tooltip title="Star">
                            <IconButton arai-label="Star">
                              <StarIcon className="col-orange" />
                            </IconButton>
                          </Tooltip>
                        </div>
                        <img className="img-circle doc-card-image" style={{ width: "100px" }} src="https://picsum.photos/202" />
                        {/* Card Title */}
                        <div className="doc-card-title pt-2">
                          <h4 style={{ color: '#00bdf2' }}>Dr. Sarah Smith</h4>
                        </div>
                      </div>
                    </div>
                    {/* Row Six Card Two */}
                    <div className="col-md-4 border-right mb-0">
                      {/* Card Description */}
                      <div className="description">
                        <div><i className="fas fa-map-marker-alt pt-3 psr-3"></i> Shanti Nagar Bldg No B 4, Sector No 6,
                          Mira
                          Road</div>
                        <div><i className="far fa-comment-dots pt-3 psr-3"></i> 234 Feedback </div>
                        <div><i className="far fa-money-bill-alt pt-3 psr-3"></i> INR 500 </div>
                        <div><i className="far fa-clock pt-3 psr-3 pb-3"></i> MON - SAT 10:00 AM - 8:00PM</div>
                      </div>

                      {/* 11. Card Button Icons section */}
                      <div className='contact-icons-container'>
                        {/* Hide tool tip section */}
                        <Tooltip title="View Profile of Contact" arrow>
                          <IconButton className="icon-btn-margin" aria-label="Make visible">
                            <VisibilityIcon className="visibility-icon" />
                          </IconButton>
                        </Tooltip>
                        {/* Delete tool tip section */}
                        <Tooltip title="Delete contact" arrow>
                          <IconButton className="icon-btn-margin" aria-label="Delete">
                            <DeleteIcon className="delete-icon" />
                          </IconButton>
                        </Tooltip>
                        {/* Chat tool tip section */}
                        <Tooltip title="Chat contact" arrow>
                          <IconButton className="icon-btn-margin">
                            <ForumIcon className="forum-icon" />
                          </IconButton>
                        </Tooltip>
                        {/* Share tool tip section */}
                        <Tooltip title="Share contact" arrow>
                          <IconButton className="icon-btn-margin">
                            <ShareIcon className="share-icon" />
                          </IconButton>
                        </Tooltip>
                        {/* PDF tool tip section */}
                        <Tooltip title="Pdf of contact" arrow>
                          <IconButton className="icon-btn-margin">
                            <PictureAsPdfIcon className="picture-as-pdf-icon" />
                          </IconButton>
                        </Tooltip>
                        {/* Print tool tip section */}
                        <Tooltip title="Print contact" arrow>
                          <IconButton className="icon-btn-margin">
                            <PrintIcon className="print-icon" />
                          </IconButton>
                        </Tooltip>
                        {/* Storage tool tip section */}
                        <Tooltip title="Video Call" arrow>
                          <IconButton className="icon-btn-margin">
                            <VoiceChatIcon className="voice-icon" />
                          </IconButton>
                        </Tooltip>
                      </div>
                    </div>

                    <div className="d-flex col-md-6 mb-0">
                      <div className="d-flex flex-column justify-content-start user-profile w-100">
                        <div className="row">
                          {/* Row Six Card Three */}
                          <div className="col-12 col-md-4 mb-0 img-center d-flex flex-column justify-content-center">
                            {/* Card Avatar and star Icon */}
                            <div>
                              <div className='icons-container stars d-flex flex-row justify-content-end'>
                                <Tooltip title="Star">
                                  <IconButton arai-label="Star">
                                    <StarIcon className="col-orange" />
                                  </IconButton>
                                </Tooltip>
                              </div>
                              <img className="img-circle doc-card-image" style={{ width: "100px" }} src="https://picsum.photos/201" />
                            </div>
                            {/* Card title */}
                            <div className="doc-card-title pt-2">
                              <h4 style={{ color: '#00bdf2' }}>Dr. Sarah Smith</h4>
                            </div>
                          </div>

                          {/* Row Six Card Four */}
                          <div className="col-md-8 mb-0">
                            {/* Card description*/}
                            <div className="description">
                              <div><i className="fas fa-map-marker-alt pt-3 psr-3"></i> Shanti Nagar Bldg No B 4, Sector No 6,
                                Mira
                                Road</div>
                              <div><i className="far fa-comment-dots pt-3 psr-3"></i> 234 Feedback </div>
                              <div><i className="far fa-money-bill-alt pt-3 psr-3"></i> INR 500 </div>
                              <div><i className="far fa-clock pt-3 psr-3 pb-3"></i> MON - SAT 10:00 AM - 8:00PM</div>
                            </div>

                            {/* 12. Card Button Icons section */}
                            <div className='contact-icons-container'>
                              {/* Hide tool tip section */}
                              <Tooltip title="View Profile of Contact" arrow>
                                <IconButton className="icon-btn-margin" aria-label="Make visible">
                                  <VisibilityIcon className="visibility-icon" />
                                </IconButton>
                              </Tooltip>
                              {/* Delete tool tip section */}
                              <Tooltip title="Delete contact" arrow>
                                <IconButton className="icon-btn-margin" aria-label="Delete">
                                  <DeleteIcon className="delete-icon" />
                                </IconButton>
                              </Tooltip>
                              {/* Chat tool tip section */}
                              <Tooltip title="Chat contact" arrow>
                                <IconButton className="icon-btn-margin">
                                  <ForumIcon className="forum-icon" />
                                </IconButton>
                              </Tooltip>
                              {/* Share tool tip section */}
                              <Tooltip title="Share contact" arrow>
                                <IconButton className="icon-btn-margin">
                                  <ShareIcon className="share-icon" />
                                </IconButton>
                              </Tooltip>
                              {/* PDF tool tip section */}
                              <Tooltip title="Pdf of contact" arrow>
                                <IconButton className="icon-btn-margin">
                                  <PictureAsPdfIcon className="picture-as-pdf-icon" />
                                </IconButton>
                              </Tooltip>
                              {/* Print tool tip section */}
                              <Tooltip title="Print contact" arrow>
                                <IconButton className="icon-btn-margin">
                                  <PrintIcon className="print-icon" />
                                </IconButton>
                              </Tooltip>
                              {/* Storage tool tip section */}
                              <Tooltip title="Video Call" arrow>
                                <IconButton className="icon-btn-margin">
                                  <VoiceChatIcon className="voice-icon" />
                                </IconButton>
                              </Tooltip>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>;
}